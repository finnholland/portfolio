# YouAreHere

<p align="center"><img src="../public/images/youarehere.png" alt="YouAreHere" width="400" /></p>

A React Native app for iOS and Android featuring Google Maps integration, camera capture with HDR and zoom controls, an infinite-scroll social feed, push notifications via FCM, real-time leaderboards, and full English/Korean localisation.

## Tech Stack

| Layer | Technologies |
|---|---|
| Mobile | React Native 0.76, Swift (iOS), Kotlin (Android) |
| Maps | Google Maps (`react-native-maps`), Google Street View (`react-native-streetview`) |
| Camera | `react-native-vision-camera` v4 |
| Backend | Firebase Cloud Functions (Node.js, `asia-southeast1`) |
| Database | Cloud Firestore |
| Auth | Firebase Authentication (phone number / OTP) |
| Storage | Firebase Storage |
| Notifications | Firebase Cloud Messaging + Notifee (local notifications) |
| Styling | NativeWind v4 (Tailwind CSS for React Native) |
| Navigation | React Navigation v7 (stack + bottom tabs + material top tabs) |
| Animation | React Native Reanimated v3 |
| Geolocation | `react-native-geolocation-service`, `geolib` (Haversine distance) |
| Storage | MMKV + AsyncStorage |
| i18n | i18next |
