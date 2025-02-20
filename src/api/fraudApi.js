export async function checkFraud({ amount, cardNumber, description }) {
  const response = await fetch('/api/fraud-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, cardNumber, description })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const data = await response.json();
  return data;
}