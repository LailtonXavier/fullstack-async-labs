export default {
  expo: {
    name: 'mobile-buy-now',
    slug: 'mobile-buy-now',
    version: "1.1.0",
    runtimeVersion: "1.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "buynow",
    userInterfaceStyle: "automatic",
    platforms: ["android", "ios"],
    newArchEnabled: true,
    
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lailtonnx.mobilebuynow"
    },
    
    android: {
      package: "com.lailtonnx.mobilebuynow",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    
    updates: {
      url: "https://u.expo.dev/04337f45-9680-46c2-a5dc-21d47158d20b"
    },
    
    extra: {
      eas: {
        projectId: "66693bb9-98c3-4693-9045-abf3f553ba3e"
      },
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
      EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            backgroundColor: "#000000"
          }
        }
      ]
    ],
    
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    }
  },
};