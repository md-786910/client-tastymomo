import { useState } from 'react';

const OrderModal = ({ momo, onClose, onPaymentSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const discountedPrice = momo.price - (momo.price * momo.discount / 100);
  const subtotal = discountedPrice * quantity;
  const couponDiscountAmount = subtotal * (couponDiscount / 100);
  const total = subtotal - couponDiscountAmount;

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');

    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Validate coupon codes
    const code = couponCode.toUpperCase();
    if (code === 'MOMO10') {
      setCouponDiscount(10);
      setCouponSuccess('10% discount applied successfully!');
    } else if (code === 'MOMO20') {
      setCouponDiscount(20);
      setCouponSuccess('20% discount applied successfully!');
    } else if (code === 'TASTY50') {
      setCouponDiscount(50);
      setCouponSuccess('Wow! 50% discount applied successfully!');
    } else {
      setCouponError('Invalid coupon code. Try MOMO10 or MOMO20');
      setCouponDiscount(0);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Header */}
      <div className="sticky top-0 bg-black shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Momo Image and Details */}
        <div className="momo-card mb-6">
          <img
            src={momo.image}
            alt={momo.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{momo.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-primary text-lg font-bold mr-2">₹{discountedPrice}</span>
              {momo.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">₹{momo.price}</span>
              )}
              {momo.discount > 0 && (
                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {momo.discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-3">
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm text-gray-300">{momo.description}</p>
            </div>

            <div className="mt-3">
              <h4 className="font-medium mb-1">Ingredients</h4>
              <p className="text-sm text-gray-300">
                {momo.type === 'steam' && 'Flour, Water, Salt, Vegetable/Meat filling, Spices, Herbs'}
                {momo.type === 'fry' && 'Flour, Water, Salt, Vegetable/Meat filling, Spices, Herbs, Cooking oil'}
                {momo.type === 'kurkure' && 'Flour, Water, Salt, Vegetable/Meat filling, Spices, Herbs, Kurkure coating, Cooking oil'}
              </p>
            </div>

            <div className="mt-3">
              <h4 className="font-medium mb-1">Preparation</h4>
              <p className="text-sm text-gray-300">
                {momo.type === 'steam' && 'Freshly prepared dough filled with spiced mixture and steamed to perfection.'}
                {momo.type === 'fry' && 'Steamed momos that are lightly fried to give a crispy exterior while maintaining a juicy interior.'}
                {momo.type === 'kurkure' && 'Momos coated with crushed Kurkure/corn flakes and deep fried for extra crunch.'}
              </p>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="card mb-6">
          <h4 className="font-medium mb-3">Quantity</h4>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20"
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="mx-6 font-medium text-lg">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20"
                disabled={quantity >= 10}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Price</p>
              <p className="font-medium">₹{discountedPrice} x {quantity}</p>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="card mb-6">
          <h4 className="font-medium mb-3">Apply Coupon</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="btn btn-primary whitespace-nowrap"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>
          {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
          {couponSuccess && <p className="text-green-500 text-xs mt-2">{couponSuccess}</p>}
          <p className="text-xs text-gray-400 mt-2">Try coupon codes: MOMO10, MOMO20, TASTY50</p>
        </div>

        {/* Order Summary */}
        <div className="card mb-6">
          <h4 className="font-medium mb-3">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Coupon Discount ({couponDiscount}%)</span>
                <span>-₹{couponDiscountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Payment Button */}
      <div className="sticky bottom-0 bg-black p-4 border-t border-white/10">
        <button
          onClick={handlePayment}
          className="btn btn-primary w-full py-3 text-lg"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Your order will be prepared immediately after payment
        </p>
      </div>
    </div>
  );
};

export default OrderModal;