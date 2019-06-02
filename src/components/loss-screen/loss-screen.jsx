import React from 'react';
import PropTypes from 'prop-types';

const LossScreen = (props) => {
  const {restart} = props;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">
        У вас закончились все попытки. Ничего, повезёт в следующий раз!
      </p>
      <button className="replay" type="button" onClick={restart}>Попробовать ещё раз</button>
    </section>
  );
};

LossScreen.propTypes = {
  restart: PropTypes.func.isRequired,
};

export default LossScreen;
