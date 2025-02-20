import React from 'react';
import FraudChecker from './components/FraudChecker';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white p-4 shadow">
        <h1 className="text-3xl font-bold text-center">FraudShield</h1>
        <p className="text-center mt-2">Advanced Fraud Protection on Banking Transactions</p>
      </header>
      <main className="flex-grow p-6">
        <FraudChecker />
      </main>
      <footer className="bg-gray-100 text-center p-3">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 cursor-pointer"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}