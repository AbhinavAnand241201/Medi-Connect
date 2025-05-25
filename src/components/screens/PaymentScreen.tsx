import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenProps } from '../App';
import { enhancedStyles, motionVariants } from '../../styles/enhanced';
import { FaCheck, FaCrown, FaUserFriends, FaBuilding } from 'react-icons/fa';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'AI Symptom Analysis',
      'Basic Health Tracking',
      'Email Support',
      'Limited Video Consultations'
    ],
    icon: <FaUserFriends className="text-blue-500 text-2xl" />
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    features: [
      'Everything in Basic',
      'Unlimited Video Consultations',
      'Priority Support',
      'Advanced Health Analytics',
      'Medical Records Storage'
    ],
    icon: <FaCrown className="text-yellow-500 text-2xl" />,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Premium',
      'Family Plan (up to 5 members)',
      '24/7 Priority Support',
      'Custom Health Reports',
      'API Access',
      'Dedicated Account Manager'
    ],
    icon: <FaBuilding className="text-purple-500 text-2xl" />
  }
];

export const PaymentScreen: React.FC<ScreenProps> = ({ navigateTo, currentScreen }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async (planId: string) => {
    // This will be implemented later with Stripe integration
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={motionVariants.fadeIn}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            variants={motionVariants.childFadeIn}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            variants={motionVariants.childFadeIn}
            className="text-xl text-gray-600"
          >
            Select the perfect plan for your healthcare needs
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div
            style={enhancedStyles.glassContainer}
            className="inline-flex p-1 rounded-lg"
          >
            <button
              onClick={() => setBillingInterval('month')}
              className={`px-4 py-2 rounded-md ${
                billingInterval === 'month'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`px-4 py-2 rounded-md ${
                billingInterval === 'year'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={motionVariants.scaleIn}
              className={`relative ${
                plan.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                style={enhancedStyles.glassContainer}
                className={`h-full flex flex-col ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-blue-500'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {plan.icon}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingInterval === 'year' ? (plan.price * 0.8 * 12).toFixed(2) : plan.price}
                  </span>
                  <span className="text-gray-600">/{billingInterval}</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  style={enhancedStyles.primaryButton}
                  className="w-full"
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          variants={motionVariants.fadeIn}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-gray-600 mt-2">
            Need a custom plan?{' '}
            <button
              onClick={() => navigateTo('home')}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Contact Sales
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}; 