import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {gameTime, mistakesCount} = props;

  const clickHandler = (evt) => {
    evt.target.style.borderLeftColor = `blue`;
  };

  return (
    <WelcomeScreen gameTime={gameTime} mistakesCount={mistakesCount} clickHandler={clickHandler} />
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
};

export default App;
