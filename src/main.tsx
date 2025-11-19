import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load only essential font weights to improve performance
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

createRoot(document.getElementById("root")!).render(<App />);
