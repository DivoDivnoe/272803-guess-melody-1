import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Track from './track.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  src: ``,
  clickHandler: jest.fn(),
  isPlaying: false,
};

describe(`Track component`, () => {
  it(`renders correctly`, () => {
    const {src, clickHandler, isPlaying} = mock;

    const track = mount(
        <Track src={src} clickHandler={clickHandler} isPlaying={isPlaying} />
    );

    track.instance()._audioRef.current.pause = () => {};
    track.instance()._audioRef.current.play = () => {};

    expect(track.find(`button`).prop(`disabled`)).toEqual(true);

    track.setState({
      isLoading: false
    });
    expect(track.find(`button`).prop(`disabled`)).toEqual(false);

    track.find(`button`).simulate(`click`);
    expect(track.find(`button`).hasClass(`track__button--pause`)).toBe(true);

    track.find(`button`).simulate(`click`);
    expect(track.find(`button`).hasClass(`track__button--play`)).toBe(true);
  });
});
