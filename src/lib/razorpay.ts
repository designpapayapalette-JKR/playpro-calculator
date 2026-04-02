import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  // We'll throw an error if keys are missing in production
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Razorpay keys are missing!');
  }
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});
