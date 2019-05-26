import React from 'react';
import Proptypes from 'prop-types';

const Track = (props) => {
  const {isLoading, isPlaying, renderPlayer, clickHandler} = props;

  return (
    <div className="game__track">
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={clickHandler}
      />
      <div className="track__status">
        {renderPlayer()}
      </div>
    </div>
  );
};

Track.propTypes = {
  clickHandler: Proptypes.func.isRequired,
  renderPlayer: Proptypes.func.isRequired,
  isPlaying: Proptypes.bool.isRequired,
  isLoading: Proptypes.bool.isRequired,
};

export default Track;
