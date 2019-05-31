import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withPlaying from './with-playing';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithPlayingComponent = withPlaying(MockComponent);

const mock = {
  submitHandler: jest.fn(),
  question: {
    type: `artist`,
    song: {
      src: ``,
      artist: `Bugs Bunny`,
    },
    answers: [
      {
        picture: ``,
        artist: `Kotan Boryan`,
      },
      {
        picture: ``,
        artist: `Bugs Bunny`,
      },
      {
        picture: ``,
        artist: `Goofy`,
      }
    ],
  },
  mistakes: 2,
};

describe(`component returned by withPlaying hoc`, () => {
  it(`is rendered with correct isPlaying prop`, () => {
    const screen = mount(
        <WithPlayingComponent
          question={mock.question}
          submitHandler={mock.submitHandler}
          mistakes={mock.mistakes}
        />
    );

    expect(screen.state().isPlaying).toEqual(false);
  });
});
