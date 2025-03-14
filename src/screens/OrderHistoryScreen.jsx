import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/common/BackHeader';
import Wrappper from '../components/common/Wrappper';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Get order history from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(orderHistory);
  }, []);

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop';
  };

  const viewOrderDetails = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab);

  return (

    <Wrappper>
      <BackHeader title="My orders" />
      {/* Order Tabs */}
      <div className="px-4 py-3">
        <div className="flex justify-between bg-gray-800 rounded-lg p-2">
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'all' ? 'btn-primary text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'waiting' ? 'btn-primary text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}
            onClick={() => setActiveTab('waiting')}
          >
            Waiting
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'completed' ? 'btn-primary text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {/* Order History */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
            <div className="bg-white/5 rounded-full p-6 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-400 text-center mb-8 max-w-xs">
              Looks like you haven't placed any orders in this category yet
            </p>
            <a
              href="/"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-all"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => viewOrderDetails(order.id)}
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-semibold">Order #{order.id.toString().slice(-4)}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(order.date).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${order.status === 'waiting'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-green-500/20 text-green-500'
                    }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={handleImageError}
                        />
                        {item.discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.discount}%
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-400">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Momo
                            </p>
                          </div>
                          <p className="font-bold text-primary">
                            ₹{(item.price - (item.price * item.discount / 100)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 text-primary px-3 py-1.5 rounded-full font-medium">
                      #{order.queueNo}
                    </div>
                    <p className="text-sm text-gray-400">~15 min wait</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Total:</span>
                    <span className="font-bold text-lg text-primary">₹{order.total}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrappper>


  );
};

export default OrderHistoryScreen;