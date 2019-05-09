import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import mocks from './mocks/questions';

const {settings, questions} = mocks;

const init = () => {
  const main = document.querySelector(`.main`);

  ReactDOM.render(<App settings={settings} questions={questions} />, main);
};

init();
