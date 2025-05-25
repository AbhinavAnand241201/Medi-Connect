import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../../store';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCheck, FaTimes, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic symptom checker',
      'Limited AI diagnoses (3 per month)',
      'Basic health tracking',
      'Email support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    interval: 'month',
    features: [
      'Advanced symptom checker',
      'Unlimited AI diagnoses',
      'Video consultations',
      'Comprehensive health tracking',
      'Priority support',
      'Health insights and recommendations',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    interval: 'month',
    features: [
      'All Premium features',
      'Dedicated health coach',
      'Family plan (up to 5 members)',
      'Custom health reports',
      '24/7 priority support',
      'Advanced analytics',
    ],
  },
];

const PaymentForm: React.FC<{ plan: Plan; onSuccess: () => void }> = ({ plan, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const updateSubscription = useStore((state) => state.updateSubscription);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // In a real application, you would create a payment intent on your server
      // and handle the payment processing there
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        toast.error(error.message);
      } else {
        // Simulate successful payment
        await new Promise((resolve) => setTimeout(resolve, 1000));
        updateSubscription(plan.id as 'free' | 'premium' | 'enterprise');
        toast.success('Subscription updated successfully!');
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-lg bg-white">
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
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
          !stripe || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <FaCreditCard />
            Subscribe Now
          </>
        )}
      </motion.button>
    </form>
  );
};

export const Billing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const user = useStore((state) => state.user);
  const currentSubscription = user?.subscription || 'free';

  const handlePlanSelect = (plan: Plan) => {
    if (plan.id === currentSubscription) {
      toast.info('You are already subscribed to this plan');
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your healthcare needs. All plans include our core features,
          with additional benefits for premium subscribers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-lg shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500' : 'bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/{plan.interval}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.id === currentSubscription ? (
                <div className="text-center py-2 px-4 bg-gray-100 text-gray-600 rounded-lg">
                  Current Plan
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showPaymentForm && selectedPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Subscribe to {selectedPlan.name} Plan
              </h2>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">Plan Details:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">
                  {selectedPlan.name} - ${selectedPlan.price}/{selectedPlan.interval}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Billing will occur at the start of each {selectedPlan.interval}
                </p>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm
                plan={selectedPlan}
                onSuccess={() => setShowPaymentForm(false)}
              />
            </Elements>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}; 