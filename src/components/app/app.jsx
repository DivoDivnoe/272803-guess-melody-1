import React, {PureComponent} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import PropTypes from 'prop-types';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: -1,
    };
  }

  render() {
    const {questions} = this.props;
    const {questionNumber} = this.state;

    const clickHandler = () => {
      this.setState({
        questionNumber: questionNumber >= questions.length - 1 ? -1 : questionNumber + 1
      });
    };

    return this._getScreen(questions[questionNumber], clickHandler);
  }

  _getScreen(question, clickHandler) {
    if (!question) {
      return (
        <WelcomeScreen settings={this.props.settings} clickHandler={clickHandler} />
      );
    }

    switch (question.type) {
      case `artist`:
        return (
          <GuessArtistScreen question={question} submitHandler={clickHandler} />
        );
      case `genre`:
        return (
          <GuessGenreScreen question={question} submitHandler={clickHandler} />
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
};

export default App;
