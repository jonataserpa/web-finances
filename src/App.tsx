import { BrowserRouter } from "react-router-dom";

import './shared/forms/TraducoesYup';

import { MenuSide } from './shared/components/menu-side/MenuSide';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { AppRoutes } from './routes';

function App() {

  return (
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
  )
}

export default App
