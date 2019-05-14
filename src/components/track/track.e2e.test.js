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

    const button = track.find(`button`);

    button.simulate(`click`);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
