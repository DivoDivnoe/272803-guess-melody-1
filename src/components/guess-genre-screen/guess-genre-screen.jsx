import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MistakesView from '../mistakes-view/mistakes-view.jsx';

class GuessGenreScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleAnswer = this._handleAnswer.bind(this);
  }

  render() {
    const {question, mistakes, changeAnswerHandler, renderAnswer} = this.props;
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

          <MistakesView mistakes={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={this._handleAnswer}>
            {answers.map((answer, index) => (
              <div className="track" key={index}>
                {renderAnswer(answer, index)}
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={answer.genre}
                    id={`answer-${index}`}
                    onChange={() => changeAnswerHandler(index)}
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

    this.props.submitHandler(this.props.userAnswer);
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
  mistakes: PropTypes.number.isRequired,
  changeAnswerHandler: PropTypes.func.isRequired,
  userAnswer: PropTypes.arrayOf(PropTypes.bool).isRequired,
  renderAnswer: PropTypes.func.isRequired,
};

export default GuessGenreScreen;
