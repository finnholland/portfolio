# Orbit

<p align="center"><img src="../public/images/orbiti.png" alt="Orbit" width="400" /></p>

A mobile tech demo exploring proximity-based professional networking using Bluetooth Low Energy, built with React Native for Android and iOS.

The core idea: instead of exchanging cards or scanning QR codes manually, your phone quietly broadcasts a BLE signal. When another Orbit user is nearby, their card appears automatically — sorted by signal strength, closest first.

---

## What It Does

- **Discover nearby users** passively via BLE advertising — no pairing, no tap required
- **Build a professional profile** with name, position, and LinkedIn URL
- **Generate a styled QR code** linked to your LinkedIn profile with smart PNG caching
- **Save connections** found nearby, persisted to the cloud
- **Open LinkedIn profiles** directly from a discovered user's card

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | React Native 0.83, React 19, TypeScript |
| Styling | NativeWind (Tailwind CSS for RN), react-native-linear-gradient |
| Navigation | React Navigation 7 (stack + bottom tabs) |
| BLE | react-native-ble-advertiser (custom module) |
| QR Codes | react-native-qrcode-styled, react-native-view-shot |
| Hashing | js-sha256 |
| Camera | react-native-vision-camera v4 |
| Cloud DB | Firebase Firestore |
| Cloud Storage | Firebase Storage |
| Animations | Moti, react-native-reanimated v4 |
| Permissions | react-native-permissions |
| File System | react-native-fs |
| State | React Context + AsyncStorage |

---

## Demos

### Bluetooth Low Energy Discovery

The scan screen is the centrepiece of the app. On load it simultaneously **broadcasts** and **scans** using BLE advertising.

Each user is assigned a UUID on first launch. This UUID is embedded as a BLE service UUID with a fixed suffix (`00b2b2`) so Orbit devices can be filtered from other BLE noise. The broadcast carries no identifiable information — only the UUID. When a matching signal is detected, the app fetches the user's profile from Firestore using that UUID.

Discovered devices are shown as cards and re-sorted live as RSSI (received signal strength) updates — the closest person floats to the top. Devices that stop broadcasting are aged out automatically.

Key parameters:
- Company ID: `0x8101`
- Advertise mode: balanced
- TX power: medium
- Connectable: false (advertisement only)

---

### QR Code Generation with SHA-256 PNG Caching

Generating a styled QR code is relatively expensive — the SVG render + PNG capture takes a noticeable moment. To avoid regenerating on every visit, the app implements a hash-based file cache:

1. The user's LinkedIn URL is hashed with **SHA-256**
2. The hash is stored in AsyncStorage alongside the path to the cached PNG (`qr-{hash}.png` in the device's cache directory)
3. On subsequent visits, if the hash matches the stored hash and the file exists, the cached PNG is used immediately — no re-render
4. If the LinkedIn URL changes, the old PNG is deleted and a new one is generated and cached under the new hash

This means the QR screen is instant on repeat visits, and storage never accumulates stale files.

The QR codes themselves use `react-native-qrcode-styled` with rounded corner eyes and rounded data modules for a polished look.

---

### Profile & Camera

Users set up a profile with a name, position, and LinkedIn URL. Profile photos are captured in-app using `react-native-vision-camera` with a custom capture button and tap-to-focus, then uploaded to Firebase Storage. The stored download URL is written back to Firestore and displayed on other users' cards.

LinkedIn URL input is permissive — the app normalises full URLs, partial paths, and bare usernames to a consistent format before storing.

---

### Saved Connections

Any discovered user can be bookmarked with a single tap. Saved connections are stored in Firestore under the user's document and displayed in a dedicated screen sorted by date. The save state is reflected immediately in the UI via optimistic context updates.

---

### Network Guard

A `ConnectionGuard` component wraps the app and monitors connectivity via `@react-native-community/netinfo`. When the device goes offline, a modal overlay is displayed — preventing interactions that would silently fail.

---

### Animations & Loading States

- Skeleton loading cards (via Moti) while Firestore profiles load after BLE discovery
- Slide-in/out action menu (bottom sheet style) for choosing camera vs gallery
- Reanimated-powered camera transitions

---

## Architecture Notes

The app is structured around a single global `UserContext` that holds the authenticated user's profile. On first launch a UUID is generated and stored in AsyncStorage — this acts as the persistent identity key across Firestore, Storage, and BLE.

All cloud operations are isolated in `src/helpers/firebase.ts`. BLE logic lives entirely in `src/screens/Scan.tsx`. QR caching is self-contained in `src/helpers/generateQrCode.ts`.

```
src/
├── screens/        Splash, Scan, Profile, QRCode, Saved
├── components/     UserCard, ProfileCamera, ActionMenu, ConnectionGuard, skeletons
├── helpers/        firebase, UserContext, generateQrCode, normalise, permissions
└── assets/         SVG icon components
```
