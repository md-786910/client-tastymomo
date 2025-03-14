import { useState, useEffect } from 'react';
import Header from '../components/Header';
import OfferCards from '../components/OfferCards';
import TabsFilter from '../components/TabsFilter';
import FeaturedMomo from '../components/FeaturedMomo';
import MomoGrid from '../components/MomoGrid';
import OrderStatus from '../components/OrderStatus';
import Wrappper from '../components/common/Wrappper';

const MainScreen = () => {
  const [momos, setMomos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedMomo, setSelectedMomo] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    setMomos([
      {
        id: 12,
        name: 'Steam Momo',
        price: 120,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Delicious steamed momos with special sauce',
        type: 'steam'
      },
      {
        id: 1,
        name: 'Steam Momo',
        price: 120,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Delicious steamed momos with special sauce',
        type: 'steam'
      },
      {
        id: 2,
        name: 'Fried Momo',
        price: 150,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Crispy fried momos with spicy dip',
        type: 'fry'
      },
      {
        id: 3,
        name: 'Kurkure Momo',
        price: 180,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Crunchy kurkure coated momos',
        type: 'kurkure'
      },
      {
        id: 4,
        name: 'Tandoori Momo',
        price: 200,
        discount: 5,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Spicy tandoori momos with mint chutney',
        type: 'steam'
      },
      {
        id: 5,
        name: 'Paneer Momo',
        price: 160,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Soft momos filled with paneer',
        type: 'steam'
      },
      {
        id: 6,
        name: 'Chicken Momo',
        price: 180,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Juicy chicken momos with special sauce',
        type: 'fry'
      },
      {
        id: 7,
        name: 'Paneer Momo',
        price: 160,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Soft momos filled with paneer',
        type: 'steam'
      },
      {
        id: 8,
        name: 'Chicken Momo',
        price: 180,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Juicy chicken momos with special sauce',
        type: 'fry'
      },
      {
        id: 9,
        name: 'Paneer Momo',
        price: 160,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Soft momos filled with paneer',
        type: 'steam'
      },
      {
        id: 10,
        name: 'Chicken Momo',
        price: 180,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Juicy chicken momos with special sauce',
        type: 'fry'
      },
      {
        id: 10,
        name: 'Chicken Momo',
        price: 180,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        description: 'Juicy chicken momos with special sauce',
        type: 'fry'
      },

    ]);
  }, []);

  const handleOrderClick = (momo) => {
    setSelectedMomo(momo);
  };

  // const handlePaymentSuccess = () => {
  //   setOrderSuccess(true);

  //   // Add to order history in localStorage
  //   const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  //   const newOrder = {
  //     id: Date.now(),
  //     date: new Date().toISOString(),
  //     items: [selectedMomo],
  //     total: selectedMomo.price - (selectedMomo.price * selectedMomo.discount / 100),
  //     status: 'waiting',
  //     queueNo: Math.floor(Math.random() * 100) + 1
  //   };

  //   orderHistory.unshift(newOrder);
  //   localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

  //   // Hide success message after 3 seconds
  //   setTimeout(() => {
  //     setOrderSuccess(false);
  //   }, 3000);
  // };

  const filteredMomos = selectedTab === 'all'
    ? momos
    : momos.filter(momo => momo.type === selectedTab);
  return (
    <Wrappper>
      <Header />
      {orderSuccess && (
        <div className="fixed top-16 left-0 right-0 mx-auto w-11/12 max-w-md bg-green-500 text-white p-4 rounded-md shadow-lg z-50 text-center success-message">
          Order placed successfully! Check your order history.
        </div>
      )}
      <OfferCards />
      <TabsFilter selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {filteredMomos.length > 0 && (
        <FeaturedMomo
          momo={filteredMomos[0]}
          onOrderClick={handleOrderClick}
        />
      )}



      <MomoGrid
        momos={momos}
        onOrderClick={handleOrderClick}
      />

      {/* <OrderStatus /> */}
    </Wrappper>

  );
};

export default MainScreen;