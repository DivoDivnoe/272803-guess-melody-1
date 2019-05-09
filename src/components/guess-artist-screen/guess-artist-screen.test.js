import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

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
  }
};

describe(`GuessArtistScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <GuessArtistScreen question={mock.question} submitHandler={mock.submitHandler} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
