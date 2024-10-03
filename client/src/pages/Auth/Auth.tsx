import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './authAnimations.css'; // You'll need to create this file for the CSS animations

const AuthComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen max-w-3xl flex flex-row items-center justify-between mx-auto">
        <div>
          {/* Logo and Branding */}
          <div className="mb-8">
            <img src="/logo.png" alt="Chat App Logo" className="w-16 h-16" />
            <h1 className="text-2xl font-bold text-[#2e9ccc]">
              Welcome to Chatify
            </h1>
            <p className="text-gray-500">
              Connect with your friends instantly!
            </p>
          </div>
        </div>

        <div className="w-full max-w-md p-8 mover overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex justify-around mb-6">
            <button
              className={`text-lg font-semibold pb-2 ${
                isSignIn
                  ? 'text-[#2e9ccc] border-b-2 border-[#2e9ccc]'
                  : 'text-gray-400'
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`text-lg font-semibold pb-2 ${
                !isSignIn
                  ? 'text-[#2e9ccc] border-b-2 border-[#2e9ccc]'
                  : 'text-gray-400'
              }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Animated Transition for Sign In and Sign Up */}
          <SwitchTransition>
            <CSSTransition
              key={isSignIn ? 'signIn' : 'signUp'}
              timeout={300}
              classNames="fade-slide"
            >
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
