import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const configs = {
    gameTime: 5,
    mistakesCount: 3,
  };

  const main = document.querySelector(`.main`);
  ReactDOM.render(<App gameTime={configs.gameTime} mistakesCount={configs.mistakesCount} />, main);
};

init();
