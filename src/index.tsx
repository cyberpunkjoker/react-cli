import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './entry';

export function bootstrap() {
  const rootEl = document.createElement('div');
  rootEl.classList.add('cofe-app-root');
  const root = createRoot(rootEl!);
  document.body.appendChild(rootEl);
  root.render(<App />);
}

bootstrap();