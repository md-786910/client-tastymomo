import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import { useState } from 'react';
// import './App.css';
import CartScreen from './screens/CartScreen';
import GlobalErrorBoundary from './utils/errorBoundary';
import CartSelectionScreen from './screens/CartSelectionScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    setIsLoggedIn(true);
  };

  return (
    <GlobalErrorBoundary>
      <Router>
        <div className="app-container">
          <Routes>
            {!isLoggedIn ? (
              <Route path="*" element={<LoginScreen onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<MainScreen phoneNumber={phoneNumber} />} />
                {/* <Route path="/select-cart" element={<CartSelectionScreen />} /> */}
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/order-history" element={<OrderHistoryScreen />} />
                <Route path="/order-detail/:orderId" element={<OrderDetailScreen />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </GlobalErrorBoundary>

  );
}

export default App;
