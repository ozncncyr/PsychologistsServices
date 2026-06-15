Redux layout (brief)

- Install dependencies:

  npm install @reduxjs/toolkit react-redux

- Location:
  - `src/redux/store.js` - store setup
  - `src/redux/features/*` - feature slices and thunks
  - `src/services/firebase` - firebase adapter used by thunks

- Features included:
  - `auth` - register/login/logout (uses Firebase Auth)
  - `psychologists` - fetch list from Firestore
  - `filter` - UI filters for psychologists listing
  - `favorites` - user favorites (local state + sync hooks)
  - `appointments` - placeholder for appointment draft
  - `ui` - global UI state (modals, loading, toast)

- Usage:
  - Wrap app with `Provider` (already wired in `src/main.jsx`).
  - Use `authThunks` to login/register.
  - Use `getPsychologists` from `src/services/firebase/api.js` inside thunks.
