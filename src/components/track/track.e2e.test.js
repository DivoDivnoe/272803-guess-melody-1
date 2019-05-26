import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Track from './track.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  renderPlayer: jest.fn(),
  clickHandler: jest.fn(),
  isPlaying: false,
  isLoading: true,
};

describe(`Track component`, () => {
  it(`reacts correctly to clicking the button`, () => {
    const {isLoading, clickHandler, isPlaying, renderPlayer} = mock;

    const track = shallow(
        <Track
          isLoading={isLoading}
          clickHandler={clickHandler}
          isPlaying={isPlaying}
          renderPlayer={renderPlayer}
        />
    );

    expect(track.find(`button`).prop(`disabled`)).toEqual(true);

    track.setProps({isLoading: false});
    expect(track.find(`button`).prop(`disabled`)).toEqual(false);

    track.find(`button`).simulate(`click`);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
