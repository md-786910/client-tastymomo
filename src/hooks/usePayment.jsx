import { useState } from "react";
import { paymentService } from "../services/paymentService";

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (paymentDetails) => {
    setIsLoading(true);
    setError(null);

    try {
      await paymentService.initializeRazorpay();

      const orderData = await paymentService.createOrder(
        paymentDetails.amount,
        paymentDetails.orderId
      );

      await paymentService.processPayment({
        ...paymentDetails,
        razorpayOrderId: orderData.id,
      });

      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  };

  return {
    initiatePayment,
    isLoading,
    error,
  };
};
