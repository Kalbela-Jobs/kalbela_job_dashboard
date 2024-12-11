import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Provider from "./context/MainContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard_context } from "./context/Dashboard_context.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Dashboard_context>
          <App />
        </Dashboard_context>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
