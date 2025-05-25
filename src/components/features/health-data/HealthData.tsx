import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../../store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import { FaWeight, FaHeartbeat, FaTachometerAlt } from 'react-icons/fa';

export const HealthData: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'bloodPressure' | 'heartRate'>(
    'weight'
  );
  const healthData = useStore((state) => state.user?.healthData);
  const addHealthData = useStore((state) => state.addHealthData);

  // Generate dummy data for demonstration
  const generateDummyData = () => {
    const today = new Date();
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(today, 29 - i);
      return {
        date: format(date, 'MMM dd'),
        weight: Math.round(70 + Math.random() * 2 * 100) / 100,
        systolic: Math.round(110 + Math.random() * 20),
        diastolic: Math.round(70 + Math.random() * 10),
        heartRate: Math.round(60 + Math.random() * 20),
      };
    });

    if (healthData) {
      addHealthData({
        weight: data.map((d) => d.weight),
        bloodPressure: {
          systolic: data.map((d) => d.systolic),
          diastolic: data.map((d) => d.diastolic),
        },
        heartRate: data.map((d) => d.heartRate),
        dates: data.map((d) => d.date),
      });
    }

    return data;
  };

  const data = healthData ? generateDummyData() : [];

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'weight':
        return '#3B82F6'; // blue
      case 'systolic':
        return '#EF4444'; // red
      case 'diastolic':
        return '#F97316'; // orange
      case 'heartRate':
        return '#10B981'; // green
      default:
        return '#6B7280'; // gray
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'weight':
        return <FaWeight className="text-blue-500" />;
      case 'bloodPressure':
        return <FaTachometerAlt className="text-red-500" />;
      case 'heartRate':
        return <FaHeartbeat className="text-green-500" />;
      default:
        return null;
    }
  };

  const getMetricTitle = (metric: string) => {
    switch (metric) {
      case 'weight':
        return 'Weight (kg)';
      case 'bloodPressure':
        return 'Blood Pressure (mmHg)';
      case 'heartRate':
        return 'Heart Rate (bpm)';
      default:
        return '';
    }
  };

  const renderChart = () => {
    if (selectedMetric === 'bloodPressure') {
      return (
        <>
          <Line
            type="monotone"
            dataKey="systolic"
            stroke={getMetricColor('systolic')}
            name="Systolic"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke={getMetricColor('diastolic')}
            name="Diastolic"
            strokeWidth={2}
            dot={false}
          />
        </>
      );
    }

    return (
      <Line
        type="monotone"
        dataKey={selectedMetric === 'weight' ? 'weight' : 'heartRate'}
        stroke={getMetricColor(selectedMetric)}
        name={getMetricTitle(selectedMetric)}
        strokeWidth={2}
        dot={false}
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Health Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedMetric('weight')}
          className={`p-4 rounded-lg shadow-md flex items-center gap-3 ${
            selectedMetric === 'weight'
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <FaWeight className="text-2xl text-blue-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Weight</h3>
            <p className="text-sm text-gray-600">
              {data[data.length - 1]?.weight.toFixed(1)} kg
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedMetric('bloodPressure')}
          className={`p-4 rounded-lg shadow-md flex items-center gap-3 ${
            selectedMetric === 'bloodPressure'
              ? 'bg-red-50 border-2 border-red-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <FaTachometerAlt className="text-2xl text-red-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Blood Pressure</h3>
            <p className="text-sm text-gray-600">
              {data[data.length - 1]?.systolic}/{data[data.length - 1]?.diastolic} mmHg
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedMetric('heartRate')}
          className={`p-4 rounded-lg shadow-md flex items-center gap-3 ${
            selectedMetric === 'heartRate'
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <FaHeartbeat className="text-2xl text-green-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Heart Rate</h3>
            <p className="text-sm text-gray-600">
              {data[data.length - 1]?.heartRate} bpm
            </p>
          </div>
        </motion.button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {getMetricTitle(selectedMetric)} Trend
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                tickLine={{ stroke: '#E5E7EB' }}
                domain={
                  selectedMetric === 'weight'
                    ? ['auto', 'auto']
                    : selectedMetric === 'bloodPressure'
                    ? [40, 180]
                    : [40, 120]
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              {renderChart()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Insights</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-1">{getMetricIcon(selectedMetric)}</div>
              <div>
                <p className="text-gray-700">
                  {selectedMetric === 'weight' && (
                    <>
                      Your weight has{' '}
                      {data[data.length - 1].weight > data[0].weight ? 'increased' : 'decreased'} by{' '}
                      {Math.abs(data[data.length - 1].weight - data[0].weight).toFixed(1)} kg over the
                      last 30 days.
                    </>
                  )}
                  {selectedMetric === 'bloodPressure' && (
                    <>
                      Your blood pressure is{' '}
                      {data[data.length - 1].systolic > 140 || data[data.length - 1].diastolic > 90
                        ? 'elevated'
                        : 'within normal range'}
                      .
                    </>
                  )}
                  {selectedMetric === 'heartRate' && (
                    <>
                      Your average heart rate is{' '}
                      {data.reduce((acc, curr) => acc + curr.heartRate, 0) / data.length < 60
                        ? 'below normal'
                        : data.reduce((acc, curr) => acc + curr.heartRate, 0) / data.length > 100
                        ? 'above normal'
                        : 'within normal range'}
                      .
                    </>
                  )}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
          <ul className="space-y-3">
            {selectedMetric === 'weight' && (
              <>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">•</div>
                  <p className="text-gray-700">
                    Consider maintaining a balanced diet and regular exercise routine.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">•</div>
                  <p className="text-gray-700">
                    Track your daily calorie intake and physical activity.
                  </p>
                </li>
              </>
            )}
            {selectedMetric === 'bloodPressure' && (
              <>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">•</div>
                  <p className="text-gray-700">
                    Reduce sodium intake and maintain a heart-healthy diet.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">•</div>
                  <p className="text-gray-700">
                    Regular exercise and stress management can help maintain healthy blood pressure.
                  </p>
                </li>
              </>
            )}
            {selectedMetric === 'heartRate' && (
              <>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-green-500">•</div>
                  <p className="text-gray-700">
                    Regular cardiovascular exercise can help maintain a healthy heart rate.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-green-500">•</div>
                  <p className="text-gray-700">
                    Consider monitoring your heart rate during exercise and rest periods.
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}; 