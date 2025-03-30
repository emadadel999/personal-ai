import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './styles/main.scss';


if ('virtualKeyboard' in navigator) {
    (navigator.virtualKeyboard as any).overlaysContent = true;
}

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
