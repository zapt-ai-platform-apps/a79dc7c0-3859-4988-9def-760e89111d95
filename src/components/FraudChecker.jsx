import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { checkFraud } from '../../api/fraudApi';

export default function FraudChecker() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckFraud = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setResult(null);
    setLoading(true);
    console.log('Submitting fraud check request:', { amount, cardNumber, description });
    try {
      const data = await checkFraud({ amount, cardNumber, description });
      setResult(data);
      console.log('Fraud check successful:', data);
    } catch (err) {
      console.error('Fraud check failed:', err);
      Sentry.captureException(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Fraud Protection Check</h2>
      <form onSubmit={handleCheckFraud} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Transaction Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 box-border"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 box-border"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 box-border"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        >
          {loading ? 'Checking...' : 'Check Fraud'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center">
          Error: {error}
        </div>
      )}
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Fraud Check Result:</h3>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}