import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './contexts/ContextProvider';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './index.css';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import App from './App';

import 'bootstrap/dist/js/bootstrap.js'
// import 'bootstrap/dist/css/bootstrap.min.css'

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

// function App() {
  // const { t } = useTranslation();

  // return <h2>{t('Welcome_to_React')}</h2>;
// }

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
