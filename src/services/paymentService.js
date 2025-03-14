import { loadScript } from "../utils/scriptLoader";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

class PaymentService {
  constructor() {
    if (!RAZORPAY_KEY) {
      console.log("Razorpay key not found");
      return;
    }
    this.razorpay = null;
  }

  async initializeRazorpay() {
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      return true;
    } catch (err) {
      console.error("Razorpay SDK failed to load:", err);
      throw new Error("Failed to load Razorpay SDK");
    }
  }

  async createOrder(amount, orderId) {
    try {
      // Replace with your backend API call
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Order creation failed:", error);
      throw new Error("Payment initialization failed");
    }
  }

  async processPayment(paymentDetails) {
    try {
      const options = {
        key: RAZORPAY_KEY,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        name: "Tasty Momo",
        description: `Order #${paymentDetails.orderId}`,
        order_id: paymentDetails.razorpayOrderId,
        handler: (response) => {
          this.verifyPayment(response, paymentDetails.orderId);
        },
        prefill: {
          name: paymentDetails.customerName,
          contact: paymentDetails.phoneNumber,
        },
        theme: {
          color: "#ff6b6b",
        },
        modal: {
          ondismiss: () => {
            if (paymentDetails.onCancel) {
              paymentDetails.onCancel();
            }
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

      return new Promise((resolve, reject) => {
        razorpayInstance.on("payment.success", resolve);
        razorpayInstance.on("payment.error", reject);
      });
    } catch (error) {
      console.error("Payment processing failed:", error);
      throw new Error("Payment processing failed");
    }
  }

  async verifyPayment(paymentResponse, orderId) {
    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          orderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Payment verification failed:", error);
      throw new Error("Payment verification failed");
    }
  }
}

export const paymentService = new PaymentService();
