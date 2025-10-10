import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Todos } from "./Todos.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");

createRoot(root).render(
  <StrictMode>
    <Todos />
  </StrictMode>,
);
