import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessArtistScreen from './guess-artist-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  submitHandler: jest.fn(),
  question: {
    type: `artist`,
    audio: {
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
  renderAnswer: jest.fn(),
};

describe(`GuessArtistScreen component`, () => {
  it(`reacts correctly to clicking the artist image`, () => {
    const screen = shallow(
        <GuessArtistScreen
          question={mock.question}
          submitHandler={mock.submitHandler}
          mistakes={mock.mistakes}
          renderAnswer={mock.renderAnswer}
        />
    );

    const form = screen.find(`form`);
    const input = form.find(`input`).at(0);

    form.simulate(`change`, {
      target: input,
    });

    expect(mock.submitHandler).toHaveBeenCalledTimes(1);
  });
});
