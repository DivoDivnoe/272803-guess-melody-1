import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {isLoading: true};

      this._renderPlayer = this._renderPlayer.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => {
        this.setState({
          isLoading: false,
        });
      };
    }

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
      audio.src = ``;
    }

    render() {
      const {isPlaying, clickHandler} = this.props;
      const {isLoading} = this.state;

      return (
        <Component
          isPlaying={isPlaying}
          clickHandler={clickHandler}
          isLoading={isLoading}
          renderPlayer={this._renderPlayer}
        />
      );
    }

    _renderPlayer() {
      return <audio ref={this._audioRef} />;
    }
  }

  WithAudio.propTypes = {
    src: Proptypes.string.isRequired,
    clickHandler: Proptypes.func.isRequired,
    isPlaying: Proptypes.bool.isRequired,
  };

  return WithAudio;
};

export default withAudio;
