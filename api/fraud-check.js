import Sentry from './_sentry.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { amount, cardNumber, description } = req.body;
    if (!amount || !cardNumber) {
      res.status(400).json({ error: 'Missing required transaction details' });
      return;
    }

    console.log('Received fraud check request:', { amount, cardNumber, description });

    const fraudApiUrl = process.env.FRAUD_API_URL;
    const fraudApiKey = process.env.FRAUD_API_KEY;
    if (!fraudApiUrl || !fraudApiKey) {
      throw new Error('Fraud API configuration is missing');
    }

    const response = await fetch(fraudApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fraudApiKey}`
      },
      body: JSON.stringify({ amount, cardNumber, description })
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Fraud API responded with status ${response.status}: ${responseText}`);
    }

    const data = await response.json();
    console.log('Fraud check response:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error in fraud-check endpoint:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}