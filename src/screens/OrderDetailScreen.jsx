import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import BackHeader from '../components/common/BackHeader';

const OrderDetailScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const foundOrder = orderHistory.find(o => o.id.toString() === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/order-history');
    }
  }, [orderId, navigate]);

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop';
  };

  if (!order) {
    return <div className="p-4 text-center">Loading order details...</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <BackHeader title='Order Details' />

      <div className="p-4 space-y-4">
        {/* Order Items */}
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="bg-white/5 rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={handleImageError}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      ₹{(item.price - (item.price * item.discount / 100)).toFixed(2)}
                    </span>
                    {item.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Quantity:</span>
                    <span className="font-medium">{item.quantity || 1}</span>
                  </div>
                  {item.discount > 0 && (
                    <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailScreen;