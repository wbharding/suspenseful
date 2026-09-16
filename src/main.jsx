import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InfographicPage from "./components/infographic-page.jsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InfographicPage />
  </StrictMode>,
);
