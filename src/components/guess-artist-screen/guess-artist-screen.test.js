import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

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
  mistakes: 1,
  renderAnswer: jest.fn(),
};

describe(`GuessArtistScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <GuessArtistScreen
          question={mock.question}
          submitHandler={mock.submitHandler}
          mistakes={mock.mistakes}
          renderAnswer={mock.renderAnswer}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
