import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useStore } from '../../store/store';
import { getApiUrl } from '../../utils';

export interface SignInFormData {
  userEmail: string;
  password: string;
}

// Define the sign-in request function for SWR Mutation
async function signInRequest(url: string, { arg }: { arg: SignInFormData }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  return response.json(); // Expected JSON with user and token
}

const SignIn = () => {
  // State for form inputs
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  // Zustand store actions and states
  const setUser = useStore((state) => state.setUser);
  const { trigger, isMutating, error } = useSWRMutation(
    getApiUrl('auth/signin'),
    signInRequest,
  );

  // Handle form submission for sign-in
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: SignInFormData = { userEmail, password };

    try {
      const response = await trigger(formData); // API call with form data
      // After successful response, update Zustand store with user info
      setUser({
        _id: response._id,
        token: response.token,
        fullName: response.fullName,
        userEmail: response.userEmail,
        profilePic: response.profilePic,
      });
      // alert('Signed in successfully!');
    } catch (err: unknown) {
      if (!err) {
        alert(err); // Show error if any
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        disabled={isMutating}
      >
        {isMutating ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
};

export default SignIn;
