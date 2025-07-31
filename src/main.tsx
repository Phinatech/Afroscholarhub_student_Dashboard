import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { element } from './routes/Router';
import { ToastContainer } from 'react-toastify';
import IsLoading from './pages/isLoading/IsLoading';
import { Provider } from 'react-redux';
import { persistor, store } from './service/store';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
      <Suspense fallback={<IsLoading />}>
      <Provider store={store}>
      <HelmetProvider>
        <PersistGate loading={<IsLoading />} persistor={persistor}>
          <RouterProvider router={element} />
          <ToastContainer />
        </PersistGate>
        </HelmetProvider>
        </Provider>
      </Suspense>
  </StrictMode>
);
