import 'dotenv/config';

export default {
  expo: {
    name: 'mobile-buy-now',
    slug: 'mobile-buy-now',
    extra: {
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
  },
};
