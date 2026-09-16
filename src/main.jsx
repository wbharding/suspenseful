import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FieldGuidePage from "./components/field-guide-page.jsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FieldGuidePage />
  </StrictMode>,
);
