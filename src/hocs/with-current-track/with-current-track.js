import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Track from '../../components/track/track.jsx';
import withAudio from '../../hocs/with-audio/with-audio';

const TrackWrapped = withAudio(Track);

const withCurrentTrack = (Component) => {
  class WithCurrentTrack extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {currentTrack: -1};

      this._changeCurrentTrack = this._changeCurrentTrack.bind(this);
    }

    render() {
      const {question, mistakes, submitHandler, changeAnswerHandler, userAnswer} = this.props;

      return (
        <Component
          question={question}
          mistakes={mistakes}
          submitHandler={submitHandler}
          userAnswer={userAnswer}
          changeAnswerHandler={changeAnswerHandler}
          renderPlayer={(song, index) => {
            return <TrackWrapped
              src={song.src}
              clickHandler={() => this._changeCurrentTrack(index)}
              isPlaying={this.state.currentTrack === index}
            />;
          }}
        />
      );
    }

    _changeCurrentTrack(index) {
      this.setState({currentTrack: this.state.currentTrack === index ? -1 : index});
    }
  }

  WithCurrentTrack.propTypes = {
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
  };

  return WithCurrentTrack;
};

export default withCurrentTrack;
