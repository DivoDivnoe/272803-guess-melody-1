import React from 'react';
import Proptypes from 'prop-types';

const MistakesView = ({mistakes}) => (
  <div className="game__mistakes">
    {Array.from({length: mistakes}, (_, i) => <div className="wrong" key={`mistake-${i}`}></div>)}
  </div>
);

MistakesView.propTypes = {
  mistakes: Proptypes.number.isRequired,
};

export default MistakesView;
