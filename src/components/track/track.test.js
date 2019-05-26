import React from 'react';
import renderer from 'react-test-renderer';
import Track from './track.jsx';

const mock = {
  renderPlayer: jest.fn(),
  clickHandler: jest.fn(),
  isPlaying: false,
  isLoading: true,
};

describe(`Track component`, () => {
  it(`renders correctly`, () => {
    const {renderPlayer, clickHandler, isPlaying, isLoading} = mock;

    const tree = renderer.create(
        <Track
          isLoading={isLoading}
          clickHandler={clickHandler}
          renderPlayer={renderPlayer}
          isPlaying={isPlaying}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
