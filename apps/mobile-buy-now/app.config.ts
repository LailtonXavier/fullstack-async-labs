import 'dotenv/config';

export default {
  expo: {
    name: 'mobile-buy-now',
    slug: 'mobile-buy-now',
    version: "1.1.0",
    runtimeVersion: "1.1.0",
    scheme: "buynow",
    android: {
      package: "com.lailtonnx.mobilebuynow"
    },
    ios: {
      bundleIdentifier: "com.lailtonnx.mobilebuynow"
    },
    updates: {
      url: "https://u.expo.dev/04337f45-9680-46c2-a5dc-21d47158d20b"
    },
    extra: {
      eas: {
        projectId: "66693bb9-98c3-4693-9045-abf3f553ba3e"
      },
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
  },
};
