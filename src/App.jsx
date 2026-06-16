import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import React, { Suspense, lazy, useEffect } from "react";
import { fetchPsychologists } from "./redux/features/psychologists/psychologistsThunks";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./redux/features/auth/authThunks";
import { loadFavorites } from "./redux/features/favorites/favoritesThunks";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PsychologistsPage = lazy(
  () => import("./pages/PsychologistsPage/PsychologistsPage"),
);
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(restoreUser(firebaseUser));
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(loadFavorites(user.uid));
    }
  }, [dispatch, user]);

  // Refresh data on route change
  const location = useLocation();
  useEffect(() => {
    // Dispatch actions to refresh data for relevant pages
    // For example, if you navigate to /psychologists, refetch psychologists
    if (location.pathname === "/psychologists") {
      dispatch(fetchPsychologists());
    }
    if (location.pathname === "/favorites" && user) {
      dispatch(loadFavorites(user.uid));
    }
    // Add other conditions for other pages as needed
  }, [location.pathname, dispatch, user]);

  if (isRefreshing) {
    return <div>Loading...</div>; // Or a better spinner
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
