import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrappper from '../components/common/Wrappper';

const CartSelectionScreen = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch carts data or use mock data
        const fetchCarts = async () => {
            try {
                // Mock data - replace with actual API call
                const mockCarts = [
                    {
                        id: 1,
                        name: "Tasty Momo Cart - Central Park",
                        street: "42 Central Park South, Near Fountain",
                        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop",
                        rating: 4.8,
                        distance: "0.5 km"
                    },
                    {
                        id: 2,
                        name: "Momo Express",
                        street: "78 Market Street, Near City Mall",
                        image: "https://images.unsplash.com/photo-1534422646206-5d6172b1bdd9?q=80&w=1000&auto=format&fit=crop",
                        rating: 4.5,
                        distance: "1.2 km"
                    },
                    {
                        id: 3,
                        name: "Himalayan Delights",
                        street: "23 Mountain View Road, Near Bus Terminal",
                        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
                        rating: 4.7,
                        distance: "2.3 km"
                    },
                    {
                        id: 4,
                        name: "Urban Momos",
                        street: "56 Downtown Avenue, Near Metro Station",
                        image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=1000&auto=format&fit=crop",
                        rating: 4.6,
                        distance: "0.8 km"
                    }
                ];

                setCarts(mockCarts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch carts:", error);
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);

    const handleSelectCart = (cartId) => {
        // Save selected cart to localStorage or context
        localStorage.setItem('selectedCart', cartId);
        navigate('/home');
    };

    return (
        <Wrappper>
            <div className="min-h-screen bg-black text-white p-4">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold mb-2">Select Momo Cart</h1>
                        <p className="text-gray-400">Choose a cart near you to order from</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {carts.map((cart) => (
                                <div
                                    key={cart.id}
                                    className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
                                    onClick={() => handleSelectCart(cart.id)}
                                >
                                    <div className="relative">
                                        <img
                                            src={cart.image}
                                            alt={cart.name}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                // e.target.src = 'https://via.placeholder.com/400x200?text=Momo+Cart';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3 bg-black/70 rounded-full px-2 py-1 text-xs flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {cart.rating}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold">{cart.name}</h3>
                                            <span className="text-primary text-sm font-medium">{cart.distance}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {cart.street}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Location permission note */}
                    <div className="mt-8 text-center text-xs text-gray-500">
                        <p>Allow location access for more accurate results</p>
                    </div>
                </div>
            </div>
        </Wrappper>
    );
};

export default CartSelectionScreen;