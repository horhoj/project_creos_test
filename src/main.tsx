import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '~/styles/globalStyle.scss';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import { persistor, store } from './store';
import { App } from './App';
import i18n from './i18n/i18next';
import { Spinner } from './ui/Spinner';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <BrowserRouter>
            <Suspense fallback={<Spinner isShow={true} />}>
              <App />
            </Suspense>
          </BrowserRouter>
        </I18nextProvider>
      </PersistGate>
    </Provider>,
  );
}
