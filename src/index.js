import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './contexts/ContextProvider';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './index.css';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import App from './App';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['EN', 'FR'],
    fallbackLng: "EN",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    }
  });

  const loadingMarkup = (
    <div>
      <LoadingSpinner />
    </div>
  ); 

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);
