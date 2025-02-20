# Perform Fraud Check

This journey guides you through the process of evaluating a banking transaction for potential fraud.

## Steps

1. **Access the Fraud Check Page**  
   Launch the app and navigate to the FraudShield landing page. You will see the fraud check form prominently displayed.

2. **Enter Transaction Details**  
   - Input the transaction amount.
   - Fill in the card number associated with the transaction.
   - Optionally, add a brief description of the transaction.

3. **Submit for Verification**  
   Click the "Check Fraud" button. The system will validate your inputs and send a request to the fraud detection API.

4. **Review the Results**  
   The app will display the fraud check result, including risk scores and any details returned by the API.

5. **Take Action**  
   Based on the risk assessment, decide whether to authorize, decline, or flag the transaction for further review.

## Important Information

- Ensure all transaction details are correct before submission.
- In case of errors, the app will display a descriptive error message.
- The fraud detection process leverages integrated external APIs for real-time analysis.