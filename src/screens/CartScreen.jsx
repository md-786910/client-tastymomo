import { useState } from 'react';
import BackHeader from '../components/common/BackHeader';
import Wrappper from '../components/common/Wrappper';
import Buttonx from '../components/cards/Buttonx';
import { usePayment } from '../hooks/usePayment';
const CartScreen = () => {
    const { initiatePayment, isLoading, error } = usePayment();
    const [isProcessing, setIsProcessing] = useState(false);
    const [momos, setMomos] = useState([
        {
            id: 1,
            name: 'Steam Momo',
            price: 120,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
            description: 'Delicious steamed momos with special sauce',
            type: 'steam',
            quantity: 1,
            couponCode: '',
            couponDiscount: 0
        },
        {
            id: 1,
            name: 'Steam Momo',
            price: 120,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
            description: 'Delicious steamed momos with special sauce',
            type: 'steam',
            quantity: 1,
            couponCode: '',
            couponDiscount: 0
        },
        {
            id: 1,
            name: 'Steam Momo',
            price: 120,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
            description: 'Delicious steamed momos with special sauce',
            type: 'steam',
            quantity: 1,
            couponCode: '',
            couponDiscount: 0
        },
        {
            id: 1,
            name: 'Steam Momo',
            price: 120,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
            description: 'Delicious steamed momos with special sauce',
            type: 'steam',
            quantity: 1,
            couponCode: '',
            couponDiscount: 0
        },
        {
            id: 1,
            name: 'Steam Momo',
            price: 120,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
            description: 'Delicious steamed momos with special sauce',
            type: 'steam',
            quantity: 1,
            couponCode: '',
            couponDiscount: 0
        },



        // Add more momo items as needed
    ]);


    const handlePayment = async ({ total }) => {
        setIsProcessing(true);
        const paymentDetails = {
            amount: total * 100, // Amount in paise
            currency: 'INR',
            orderId: 'ORDER_' + Date.now(),
            customerName: 'Customer Name',
            phoneNumber: '1234567890',
            onSuccess: () => {
                // Handle successful payment
                // navigate('/order-success');
            },
            onCancel: () => {
                // Handle payment cancellation
                console.log('Payment cancelled');
            },
        };

        try {
            const success = await initiatePayment(paymentDetails);
            if (success) {
                // Payment successful
                console.log('Payment successful');
            }
        } catch (err) {
            // Handle payment error
            console.error('Payment failed:', err);
        } finally {
            setTimeout(() => {
                setIsProcessing(false);
            }, 2000);
        }
    };
    const handleDeleteMomo = (momoId) => {
        setMomos(momos.filter(momo => momo.id !== momoId));
    };

    const handleQuantityChange = (momoId, value) => {
        setMomos(momos.map(momo => {
            if (momo.id === momoId) {
                const newQuantity = momo.quantity + value;
                return newQuantity >= 1 && newQuantity <= 10
                    ? { ...momo, quantity: newQuantity }
                    : momo;
            }
            return momo;
        }));
    };

    const handleApplyCoupon = (momoId, code) => {
        setMomos(momos.map(momo => {
            if (momo.id === momoId) {
                const upperCode = code.toUpperCase();
                let discount = 0;
                if (upperCode === 'MOMO10') discount = 10;
                else if (upperCode === 'MOMO20') discount = 20;
                else if (upperCode === 'TASTY50') discount = 50;

                return {
                    ...momo,
                    couponCode: code,
                    couponDiscount: discount
                };
            }
            return momo;
        }));
    };

    const calculateTotal = () => {
        return momos.reduce((total, momo) => {
            const discountedPrice = momo.price - (momo.price * momo.discount / 100);
            const subtotal = discountedPrice * momo.quantity;
            const couponDiscount = subtotal * (momo.couponDiscount / 100);
            return total + (subtotal - couponDiscount);
        }, 0);
    };

    return (
        <Wrappper>
            <BackHeader title='Cart details' />

            <div className="flex-1 overflow-y-auto pb-32" style={{
                height: "55vh",
                overflowY: "auto",
            }}>
                {momos.map(momo => (
                    <div key={momo.id} className="p-4 border-b border-white/10 " style={{ marginBottom: "3rem" }}>
                        <div className="flex gap-4">
                            <img
                                src={momo.image}
                                alt={momo.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold">{momo.name}</h3>
                                    <button
                                        onClick={() => handleDeleteMomo(momo.id)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center mt-1">
                                    <span className="text-primary text-lg font-bold">
                                        ₹{(momo.price - (momo.price * momo.discount / 100)).toFixed(2)}
                                    </span>
                                    {momo.discount > 0 && (
                                        <span className="ml-2 text-sm text-gray-400 line-through">₹{momo.price}</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(momo.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
                                            disabled={momo.quantity <= 1}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <span className="w-8 text-center font-medium">{momo.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(momo.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
                                            disabled={momo.quantity >= 10}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="p-2 text-md flex-1  py-2 bg-white/5 rounded-lg text-sm"
                                            placeholder="Enter coupon code"
                                            value={momo.couponCode}
                                            onChange={(e) => handleApplyCoupon(momo.id, e.target.value)}
                                        />
                                        <Buttonx title="Apply" onClick={() => {

                                        }} />
                                    </div>
                                    {momo.couponDiscount > 0 && (
                                        <p className="text-green-500 text-xs mt-1">
                                            {momo.couponDiscount}% discount applied!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>

            {/* Fixed Bottom Payment Button */}
            <div className="fixed bottom-16 left-0 right-0 bg-black/95 backdrop-blur-sm p-4 border-t border-white/10 shadow-lg z-50">
                {/* Order Summary */}
                <div className="p-4 mt-4">
                    <div className="space-y-3">
                        {momos.map(momo => {
                            const discountedPrice = momo.price - (momo.price * momo.discount / 100);
                            const subtotal = discountedPrice * momo.quantity;
                            const couponDiscount = subtotal * (momo.couponDiscount / 100);
                            return (
                                <div key={momo.id} className="flex justify-between text-sm text-gray-400">
                                    <span>{momo.name} (x{momo.quantity})</span>
                                    <span>₹{(subtotal - couponDiscount).toFixed(2)}</span>
                                </div>
                            );
                        })}
                        <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                            <span>Total Amount</span>
                            <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={handlePayment}
                        className="w-full p-2 btn-primary hover:bg-primary/90 active:bg-primary/80 text-white py-4 rounded-xl text-lg font-medium transition-colors"
                        disabled={isProcessing || momos.length === 0}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            `Pay ₹${calculateTotal().toFixed(2)}`
                        )}
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}
                    <p className="text-xs text-center text-gray-400 mt-2">
                        Secure payment powered by Razorpay
                    </p>
                </div>
            </div>
        </Wrappper>
    );
};

export default CartScreen;