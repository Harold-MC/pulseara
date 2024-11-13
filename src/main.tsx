import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import apolloClient from "./network/client.ts";
import App from "./App.tsx";
import { theme } from "./utils/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </StrictMode>
);
