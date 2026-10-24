# Mysnapchat

A Snapchat-style ephemeral photo-messaging app built with Expo and React Native for a 2024 school assignment.

## What it does

- Register and log in against the school-provided Snapchat API (`https://snapchat.epidoc.eu`); the session token is kept in `expo-secure-store` (or `localStorage` on web).
- Take a photo with the front or back camera (`expo-camera`), preview it, and optionally save it to the device gallery.
- Pick a recipient from the user list and send the photo as a snap with a chosen display duration.
- Open received snaps; each one is shown for its duration, marked as seen, and then disappears.
- Pick an existing image from the device gallery (`expo-image-picker`).
- Register for Expo push notifications (demo screen).

## Stack

- Expo SDK 51, Expo Router 3 (file-based routing in `app/`), React Native 0.74, React 18
- TypeScript (strict), with a few `.jsx` screens
- `axios` for HTTP, `expo-secure-store` for the session token
- `expo-camera`, `expo-media-library`, `expo-image-picker`, `expo-image-manipulator`, `expo-sharing`, `expo-notifications`
- Jest (`jest-expo`) for the component snapshot test

## Run locally

Requirements: Node 18+ and npm. Expo Go on a phone, or an Android/iOS simulator, for native; a browser is enough for web.

```sh
npm install
cp .env.example .env        # then fill in EXPO_PUBLIC_API_KEY
npm start                   # Expo dev server; press w for web, a for Android, i for iOS
```

Other scripts:

```sh
npm run typecheck           # tsc --noEmit
npm test                    # jest
npx expo export --platform web   # static web build in dist/
```

Environment variables (see `.env.example`):

| Name | Purpose |
| --- | --- |
| `EXPO_PUBLIC_API_KEY` | API key sent as the `x-api-key` header to the school API |

The API base URL (`https://snapchat.epidoc.eu`) is hardcoded in the screens under `app/`. That host no longer resolves, so the app can be built and started but cannot log in or exchange snaps unless it is pointed at a compatible API.

## Project layout

- `app/(tabs)/` — public screens: landing, login, register, notifications demo
- `app/(protected)/` — screens behind the auth guard: camera, send-snap flow, snap viewer, user list, gallery
- `ctx.tsx` — `SessionProvider` / `useSession` (token + current photo)
- `components/`, `hooks/`, `constants/` — UI pieces from the Expo starter plus the snap/user cards

## Status

Built in 2024 as a school learning project; not actively maintained. The backend it was written against is offline.
