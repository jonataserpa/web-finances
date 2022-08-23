import React from "react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./shared/forms/TraducoesYup";

import { MenuSide } from "./shared/components/menu-side/MenuSide";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from "./shared/contexts";
import { AppRoutes } from "./routes";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  return (
    <IntlProvider locale="pt-BR">
      <ToastContainer
        position="top-center"
        theme="colored"
        transition={Slide}
      />

      <Provider store={store}>
        <AuthProvider>
          <AppThemeProvider>
            <DrawerProvider>
              <BrowserRouter>
                <MenuSide>
                  <AppRoutes />
                </MenuSide>
              </BrowserRouter>
            </DrawerProvider>
          </AppThemeProvider>
        </AuthProvider>
      </Provider>
    </IntlProvider>
  );
}

export default App;
