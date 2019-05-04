import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {gameTime, mistakesCount} = props;

  return <WelcomeScreen gameTime={gameTime} mistakesCount={mistakesCount} />;
};

App.propTypes = {
  gameTime: PropTypes.number,
  mistakesCount: PropTypes.number,
};

export default App;
