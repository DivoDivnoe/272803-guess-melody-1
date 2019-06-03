import React, {PureComponent} from 'react';
import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import GuessGenreScreen from '../../components/guess-genre-screen/guess-genre-screen.jsx';
import GuessArtistScreen from '../../components/guess-artist-screen/guess-artist-screen.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import ActionCreator from '../../reducer/game/game';
import withPlaying from '../with-playing/with-playing';
import withUserAnswer from '../with-user-answer/with-user-answer.js';
import withCurrentTrack from '../with-current-track/with-current-track.js';
import withTransformProps from '../with-transform-props/with-transform-props.js';
import mocks from '../../mocks/questions';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import WinScreen from '../../components/win-screen/win-screen.jsx';
import LossScreen from '../../components/loss-screen/loss-screen.jsx';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen.jsx';
import {getAuthorizationRequired, getUserData} from '../../reducer/user/selectors';
import UserActionCreator, {Operation} from '../../reducer/user/user';
import withPrivateRoute from '../with-private-route/with-private-route';

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;

  return newProps;
};

const GuessArtistScreenWrapped = withPlaying(withTransformProps(transformPlayerToAnswer)(GuessArtistScreen));
const GuessGenreScreenWrapped = withUserAnswer(withCurrentTrack(withTransformProps(transformPlayerToAnswer)(GuessGenreScreen)));
const PrivateRoute = withPrivateRoute(Route);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
      this._onUserAnswer = this._onUserAnswer.bind(this);
    }

    render() {
      const {
        questions,
        step,
        mistakes,
        authUserHandler,
        resetGame,
        userData
      } = this.props;

      return (
        <Switch>
          <Route path="/" exact render={() => (
            <Component
              questions={questions}
              step={step}
              renderScreen={this._getScreen}
            />
          )} />
          <PrivateRoute path="/win" userData={userData} render={() => (
            <WinScreen
              mistakes={mistakes}
              restart={resetGame}
              userData={userData}
            />
          )} />
          <Route path="/loss" render={() => (
            <LossScreen
              restart={resetGame}
            />
          )} />
          <Route path="/login" render={({history}) => (
            <AuthorizationScreen
              mistakes={mistakes}
              authUserHandler={authUserHandler}
              restart={resetGame}
              history={history}
            />
          )} />
        </Switch>
      );
    }

    _getScreen() {
      const {
        settings,
        mistakes,
        step,
        questions,
      } = this.props;
      const question = questions[step];

      if (mistakes >= settings.mistakesCount) {
        return <Redirect to="/loss" />;
      } else if (step >= 1) {
        return <Redirect to="/win" />;
      } else if (step < 0) {
        return <WelcomeScreen settings={settings} clickHandler={this._onUserAnswer} />;
      }

      switch (question.type) {
        case `artist`:
          return (
            <GuessArtistScreenWrapped
              question={question}
              submitHandler={this._onUserAnswer}
              mistakes={mistakes}
              key={`step-${this.props.step}`}
            />
          );
        case `genre`:
          return (
            <GuessGenreScreenWrapped
              question={question}
              submitHandler={this._onUserAnswer}
              mistakes={mistakes}
              key={`step-${this.props.step}`}
            />
          );
      }

      return null;
    }

    _onUserAnswer(userAnswer) {
      const {questions, step, userAnswerHandler} = this.props;

      userAnswerHandler(questions[step], userAnswer);
    }
  }

  WithScreenSwitch.propTypes = {
    settings: PropTypes.shape({
      gameTime: PropTypes.number.isRequired,
      mistakesCount: PropTypes.number.isRequired,
    }).isRequired,
    questions: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            type: PropTypes.oneOf([`artist`]).isRequired,
            answers: PropTypes.arrayOf(PropTypes.shape({
              picture: PropTypes.string.isRequired,
              artist: PropTypes.string.isRequired,
            })).isRequired,
            song: PropTypes.shape({
              src: PropTypes.string.isRequired,
              artist: PropTypes.string.isRequired,
            }).isRequired,
          }),
          PropTypes.shape({
            type: PropTypes.oneOf([`genre`]).isRequired,
            genre: PropTypes.oneOf(mocks.genres),
            answers: PropTypes.arrayOf(PropTypes.shape({
              src: PropTypes.string.isRequired,
              genre: PropTypes.oneOf(mocks.genres),
            })).isRequired,
          })
        ])
    ).isRequired,
    step: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    userAnswerHandler: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    changeAuthStatus: PropTypes.func.isRequired,
    authUserHandler: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }),
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
  isAuthorizationRequired: getAuthorizationRequired(state),
  userData: getUserData(state),
});
const mapDispatchToProps = (dispatch) => {
  return {
    userAnswerHandler: (question, userAnswer) => {
      dispatch(ActionCreator[`INCREMENT_STEP`]());
      dispatch(ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer));
    },
    changeAuthStatus: (status) => {
      dispatch(UserActionCreator[`REQUIRED_AUTHORIZATION`](status));
    },
    authUserHandler: (data, callback) => {
      dispatch(Operation.setUserData(data, callback));
    },
    resetGame: () => {
      dispatch(ActionCreator[`RESET_STATE`]());
    }
  };
};

export {withScreenSwitch};
export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);
