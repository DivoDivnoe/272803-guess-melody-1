import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Track from '../../components/track/track.jsx';
import withAudio from '../../hocs/with-audio/with-audio';

const TrackWrapped = withAudio(Track);

const withPlaying = (Component) => {
  class WithPlaying extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isPlaying: false};

      this._handleClick = this._handleClick.bind(this);
    }

    render() {
      const {question, mistakes, submitHandler} = this.props;
      const {isPlaying} = this.state;

      return (
        <Component
          question={question}
          mistakes={mistakes}
          submitHandler={submitHandler}
          renderPlayer={(song) => (
            <TrackWrapped
              src={song.src}
              clickHandler={this._handleClick}
              isPlaying={isPlaying}
            />)}
        />
      );
    }

    _handleClick() {
      this.setState({isPlaying: !this.state.isPlaying});
    }
  }

  WithPlaying.propTypes = {
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
    mistakes: PropTypes.number.isRequired,
  };

  return WithPlaying;
};

export default withPlaying;
