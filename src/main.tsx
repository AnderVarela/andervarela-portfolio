import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/jetbrains-mono';
import '@/styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';

const ROOT_ELEMENT_ID = 'root';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);

if (!rootElement) {
  throw new Error(`No existe el elemento #${ROOT_ELEMENT_ID} donde montar la aplicación`);
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
