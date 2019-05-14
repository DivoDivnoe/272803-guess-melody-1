import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Track from '../track/track.jsx';

class GuessGenreScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTrack: null,
    };

    this._handleAnswer = this._handleAnswer.bind(this);
  }

  render() {
    const {question} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game game--genre">
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
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={this._handleAnswer}>
            {answers.map((answer, index) => (
              <div className="track" key={index}>
                <Track
                  src={answer.src}
                  clickHandler={() => {
                    this.setState({currentTrack: this.state.currentTrack === index ? null : index});
                  }}
                  isPlaying={this.state.currentTrack === index}
                  index={index}
                />
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={answer.genre}
                    id={`answer-${index}`}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            ))}
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }

  _handleAnswer(evt) {
    evt.preventDefault();

    const chosenGenres = [...evt.target.elements]
      .filter((element) => element.checked)
      .map((element) => element.value);

    this.props.submitHandler(chosenGenres);
  }
}

GuessGenreScreen.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
    })).isRequired,
  }).isRequired,
};

export default GuessGenreScreen;
