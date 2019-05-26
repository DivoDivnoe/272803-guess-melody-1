import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withAudio from './with-audio';
import PropTypes from 'prop-types';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => <div>{props.renderPlayer()}</div>;
const WithAudioComponent = withAudio(MockComponent);

MockComponent.propTypes = {
  renderPlayer: PropTypes.func.isRequired,
};

const mock = {
  src: ``,
  clickHandler: jest.fn(),
  isPlaying: false,
};

describe(`component returned with withAudio hoc`, () => {
  it(`reacts correctly to changing isPlaying prop`, () => {
    const {src, clickHandler, isPlaying} = mock;

    const withAudioComp = mount(
        <WithAudioComponent
          src={src}
          clickHandler={clickHandler}
          isPlaying={isPlaying}
        />
    );

    const onPlayMock = jest.fn();
    const onPauseMock = jest.fn();

    withAudioComp.instance()._audioRef.current.pause = onPauseMock;
    withAudioComp.instance()._audioRef.current.play = onPlayMock;

    withAudioComp.setProps({isPlaying: true});
    expect(onPlayMock).toHaveBeenCalledTimes(1);
    expect(onPauseMock).toHaveBeenCalledTimes(0);

    withAudioComp.setProps({isPlaying: false});
    expect(onPauseMock).toHaveBeenCalledTimes(1);
  });
});
