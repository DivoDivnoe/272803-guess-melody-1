import React from 'react';
import renderer from 'react-test-renderer';
import Track from './track.jsx';

const mock = {
  src: ``,
  clickHandler: jest.fn(),
  isPlaying: false,
};

describe(`Track component`, () => {
  it(`renders correctly`, () => {
    const {src, clickHandler, isPlaying} = mock;

    const tree = renderer.create(
        <Track src={src} clickHandler={clickHandler} isPlaying={isPlaying} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
