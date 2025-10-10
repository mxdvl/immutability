import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Page } from "./Page";

const root = document.getElementById("app");
if (!root) throw new Error("Missing root element");

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
