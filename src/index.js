import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from './components/welcome-screen/welcome-screen.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {gameTime, mistakesCount} = props;

  return <WelcomeScreen gameTime={gameTime} mistakesCount={mistakesCount} />;
};

App.propTypes = {
  gameTime: PropTypes.number,
  mistakesCount: PropTypes.number,
};

const init = () => {
  const configs = {
    gameTime: 5,
    mistakesCount: 3,
  };

  const main = document.querySelector(`.main`);
  ReactDOM.render(<App gameTime={configs.gameTime} mistakesCount={configs.mistakesCount} />, main);
};

init();
