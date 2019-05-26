import React, {PureComponent} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionCreator, {checkIsGameOver} from '../../reducer/reducer';
import withPlaying from '../../hocs/with-playing/with-playing.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.js';
import withCurrentTrack from '../../hocs/with-current-track/with-current-track.js';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.js';

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

const GuessArtistScreenWrapped = withPlaying(withTransformProps(transformPlayerToAnswer)(GuessArtistScreen));
const GuessGenreScreenWrapped = withUserAnswer(withCurrentTrack(withTransformProps(transformPlayerToAnswer)(GuessGenreScreen)));

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {questions, step, userAnswerHandler, settings, checkGameStatus, mistakes} = this.props;

    checkGameStatus(settings.mistakes, questions.length, mistakes, step);

    return this._getScreen(questions[step], (userAnswer) => {
      userAnswerHandler(questions[step], userAnswer);
    });
  }

  _getScreen(question, userAnswerHandler) {
    const {settings, mistakes} = this.props;

    if (!question) {
      return (
        <WelcomeScreen settings={settings} clickHandler={userAnswerHandler} />
      );
    }

    switch (question.type) {
      case `artist`:
        return (
          <GuessArtistScreenWrapped
            question={question}
            submitHandler={userAnswerHandler}
            mistakes={mistakes}
            key={`step-${this.props.step}`}
          />
        );
      case `genre`:
        return (
          <GuessGenreScreenWrapped
            question={question}
            submitHandler={userAnswerHandler}
            mistakes={mistakes}
            key={`step-${this.props.step}`}
          />
        );
    }

    return null;
  }
}

App.propTypes = {
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    mistakesCount: PropTypes.number.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
          answers: PropTypes.arrayOf(PropTypes.shape({
            picture: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          })).isRequired,
          audio: PropTypes.shape({
            src: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          }).isRequired,
        }),
        PropTypes.shape({
          type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
          genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
          answers: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
          })).isRequired,
        })
      ])
  ).isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  userAnswerHandler: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  checkGameStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, state);
const mapDispatchToProps = (dispatch) => {
  return {
    userAnswerHandler: (question, userAnswer) => {
      dispatch(ActionCreator[`INCREMENT_STEP`]());
      dispatch(ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer));
    },
    checkGameStatus: (gameMistakes, numberOfquestions, currentMistakes, currentStep) => {
      if (checkIsGameOver(gameMistakes, numberOfquestions, currentMistakes, currentStep)) {
        dispatch(ActionCreator[`RESET_STATE`]());
      }
    },
    resetGame: () => {
      dispatch(ActionCreator[`RESET_STATE`]());
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
