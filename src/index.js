import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const configs = {
  gameTime: 7,
  mistakesCount: 4,
};

const init = () => {
  const main = document.querySelector(`.main`);

  ReactDOM.render(<App gameTime={configs.gameTime} mistakesCount={configs.mistakesCount} />, main);
};

init();
