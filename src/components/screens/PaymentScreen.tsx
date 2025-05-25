import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCheck, FaLock, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ScreenName } from '../App';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Basic health tracking',
      'Limited video consultations',
      'Basic AI diagnosis',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    features: [
      'Advanced health tracking',
      'Unlimited video consultations',
      'Advanced AI diagnosis',
      'Priority support',
      'Medical records storage',
      'Family member accounts'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'All Premium features',
      'Custom integrations',
      'Dedicated support team',
      'Advanced analytics',
      'API access',
      'Custom branding'
    ]
  }
];

interface PaymentScreenProps {
  navigateTo: (screen: ScreenName) => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  currentScreen: ScreenName;
}

const PaymentForm: React.FC<{
  selectedPlan: SubscriptionPlan;
  onSuccess: () => void;
}> = ({ selectedPlan, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Here you would typically make an API call to your backend to create a subscription
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Welcome to MediConnect Premium.');
      onSuccess();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center space-x-2 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaCreditCard />
              <span>Subscribe Now</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center text-sm text-gray-500">
        <FaLock className="mr-2" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </form>
  );
};

export const PaymentScreen: React.FC<PaymentScreenProps> = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscriptionPlans[1]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    // Here you would typically update the user's subscription status
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your healthcare needs. All plans include our core features
            with different levels of access and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.popular ? 'Get Started' : 'Select Plan'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {showPaymentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Complete Your Subscription
              </h2>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Selected Plan</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{selectedPlan.name}</span>
                  <span className="font-medium text-gray-900">
                    ${selectedPlan.price}/{selectedPlan.interval}
                  </span>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  selectedPlan={selectedPlan}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 