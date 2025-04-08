
// Format card number with spaces (e.g., 4242 4242 4242 4242)
export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

// Format expiry date (MM/YY)
export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  
  return v;
};

// Basic card validation (Luhn algorithm)
export const isValidCardNumber = (cardNumber: string): boolean => {
  const sanitized = cardNumber.replace(/\s+/g, "");
  if (/[^0-9-\s]+/.test(sanitized)) return false;
  
  // Should be at least 16 digits
  if (sanitized.length < 16) return false;
  
  // Check if it's a test card for demo purposes
  if (sanitized === "4242424242424242") return true;
  
  // Implement actual Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Loop from right to left
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return (sum % 10) === 0;
};

// Simulate payment processing (in a real app, this would call an API)
export const processPayment = (
  cardNumber: string, 
  cardHolder: string, 
  expiryDate: string, 
  cvv: string, 
  amount: number
): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // For demonstration, validate the test card number
      if (cardNumber.replace(/\s+/g, "") === "4242424242424242") {
        resolve({ 
          success: true,
          message: "Payment successful" 
        });
      } else if (cardNumber.replace(/\s+/g, "") === "4000000000000002") {
        reject({ 
          success: false, 
          message: "Your card has been declined." 
        });
      } else {
        // Random success/failure for demo purposes
        const isSuccess = Math.random() > 0.3;
        if (isSuccess) {
          resolve({ 
            success: true,
            message: "Payment successful" 
          });
        } else {
          reject({ 
            success: false, 
            message: "Payment processing failed. Please try again." 
          });
        }
      }
    }, 2000);
  });
};
