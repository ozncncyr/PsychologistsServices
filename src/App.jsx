import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import React, { Suspense, lazy, useEffect } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./redux/features/auth/authThunks";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PsychologistsPage = lazy(
  () => import("./pages/PsychologistsPage/PsychologistsPage"),
);
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(restoreUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>; // Or a better spinner
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
