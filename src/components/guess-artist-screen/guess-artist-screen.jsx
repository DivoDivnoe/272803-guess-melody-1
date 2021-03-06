import React from 'react';
import PropTypes from 'prop-types';
import MistakesView from '../mistakes-view/mistakes-view.jsx';

const GuessArtistScreen = (props) => {
  const {question, mistakes, renderAnswer} = props;
  const {answers, song} = question;

  const handleAnswer = (evt) => {
    const chosenArtist = evt.target.value;

    props.submitHandler(chosenArtist);
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

        <MistakesView mistakes={mistakes} />
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        {renderAnswer(song)}

        <form className="game__artist" onChange={handleAnswer}>
          {answers.map(({artist, picture}, index) => (
            <div className="artist" key={artist}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={artist}
                id={`answer-${index}`}
              />
              <label className="artist__name" htmlFor={`answer-${index}`}>
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
    type: PropTypes.oneOf([`artist`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      src: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  mistakes: PropTypes.number.isRequired,
  submitHandler: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired,
};

export default GuessArtistScreen;
