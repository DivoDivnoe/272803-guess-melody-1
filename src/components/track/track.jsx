import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';

class Track extends PureComponent {
  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this.state = {
      isLoading: true,
      isPlaying,
    };

    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;

    this._audio = new Audio(src);
    this._audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
        progress: this._audio.currentTime,
      });
    };
    this._audio.ontimeupdate = () => {
      this.setState({
        progress: this._audio.currentTime,
      });
    };
    this._audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
    this._audio.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isPlaying !== prevState.isPlaying) {
      return {isPlaying: nextProps.isPlaying};
    } else {
      return null;
    }
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.ontimeupdate = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.src = ``;
    this._audio = null;
  }

  render() {
    const {isPlaying, isLoading} = this.state;

    return (
      <div className="game__track">
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handleClick}
        ></button>
        <div className="track__status">
          <audio ></audio>
        </div>
      </div>
    );
  }

  _handleClick() {
    this.props.clickHandler();
    this.setState({isPlaying: !this.state.isPlaying});
  }
}

Track.propTypes = {
  src: Proptypes.string.isRequired,
  clickHandler: Proptypes.func.isRequired,
  isPlaying: Proptypes.bool.isRequired,
};

export default Track;
