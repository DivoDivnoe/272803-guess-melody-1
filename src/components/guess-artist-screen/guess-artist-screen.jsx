import React from 'react';
import PropTypes from 'prop-types';

const GuessArtistScreen = (props) => {
  const {question, submitHandler} = props;
  const {answers} = question;

  const handleAnswer = (evt) => {
    const chosenArtist = evt.target.value;

    submitHandler(chosenArtist);
  };

  return (
    <section className="game game--artist">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle
            className="timer__line"
            cx="390"
            cy="390"
            r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg), scaleY(-1)`, transformOrigin: `center`}}
          />
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <button className="track__button track__button--play" type="button"></button>
          <audio></audio>
        </div>

        <form className="game__artist" onChange={handleAnswer}>
          {answers.map(({artist, picture}) => (
            <div className="artist" key={artist}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={artist}
                id="answer-1"
              />
              <label className="artist__name" htmlFor="answer-1">
                <img className="artist__picture" src={picture} alt={artist} />
                {artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
};

GuessArtistScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })).isRequired,
    audio: PropTypes.shape({
      src: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default GuessArtistScreen;

/* "http://placehold.it/134x134" */
