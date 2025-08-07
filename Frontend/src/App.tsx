import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
// Lazy loading the GenerateImage component

const GenerateImage = lazy(() => import("./components/GenerateImage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<GenerateImage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
