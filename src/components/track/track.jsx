import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';

class Track extends PureComponent {
  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this._audioRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying,
    };

    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
        progress: audio.currentTime,
      });
    };
    audio.ontimeupdate = () => {
      this.setState({
        progress: audio.currentTime,
      });
    };
    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
    audio.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.isPlaying !== prevState.isPlaying) {
  //     return {isPlaying: nextProps.isPlaying};
  //   } else {
  //     return null;
  //   }
  // }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.ontimeupdate = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.src = ``;
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
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
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
