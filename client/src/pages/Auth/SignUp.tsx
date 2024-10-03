import useSWRMutation from 'swr/mutation';
import { useStore } from '../../store/store';
import { getApiUrl } from '../../utils';
import { useState } from 'react';

export interface SignUpFormData {
  fullName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
  gender: string; // Add gender to the data format
}

// Function to make a POST request for sign-up
async function signUpRequest(url: string, { arg }: { arg: SignUpFormData }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json(); // Expected JSON response from API
}

const SignUp = () => {
  // Zustand store actions and states
  const setUser = useStore((state) => state.setUser);
  const { trigger, isMutating, error } = useSWRMutation(
    getApiUrl('auth/signup'),
    signUpRequest,
  );

  // State for form inputs
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState(''); // State for gender

  // Handle form submission for sign-up
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: SignUpFormData = {
      fullName,
      userEmail,
      password,
      confirmPassword,
      gender,
    };

    // Simple client-side validation for password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await trigger(formData); // Trigger SWR mutation
      // After successful sign-up, update Zustand store with user info
      setUser({
        _id: response._id,
        token: response.token,
        fullName: response.fullName,
        userEmail: response.userEmail,
        profilePic: response.profilePic,
      });
      alert('Signed up successfully!');
    } catch (err: unknown) {
      if (!err) {
        alert(err); // Show error if any
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)} // Update full name state
        placeholder="Full Name"
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      />
      <input
        type="email"
        name="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)} // Update email state
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
        placeholder="Password"
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
        placeholder="Confirm Password"
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      />
      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)} // Update gender state
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        disabled={isMutating}
      >
        {isMutating ? 'Signing up...' : 'Sign Up'}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
};

export default SignUp;
