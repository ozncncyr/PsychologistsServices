import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import React, { Suspense, lazy } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PsychologistsPage = lazy(
  () => import("./pages/PsychologistsPage/PsychologistsPage"),
);
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

function App() {
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
