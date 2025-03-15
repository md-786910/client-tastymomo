import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/momo-logo.png';

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(phoneNumber);
      // navigate('/select-cart');

    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            // src={'https://via.placeholder.com/150?text=Tasty+Momo'}
            alt="Tasty Momo Logo"
            className="w-24 h-24 mx-auto mb-4"
            onError={(e) => {
              // e.target.src = 'https://via.placeholder.com/150?text=Tasty+Momo';
            }}
          />
          <h1 className="text-3xl font-bold text-primary">Tasty Momo</h1>
          <p className="text-gray-400 mt-2">Delicious momos delivered to your doorstep</p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Login / Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="input"
                placeholder="Enter your 10-digit phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Having trouble logging in? <a href="#" className="text-primary">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;