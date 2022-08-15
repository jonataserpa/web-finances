import { BrowserRouter } from "react-router-dom";

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

function App() {
  return (
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
  );
}

export default App;
