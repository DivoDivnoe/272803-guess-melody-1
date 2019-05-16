import React from 'react';
import renderer from 'react-test-renderer';
import GuessGenreScreen from './guess-genre-screen.jsx';

const mock = {
  submitHandler: jest.fn(),
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: ``,
        genre: `pop`,
      },
      {
        src: ``,
        genre: `rock`,
      },
      {
        src: ``,
        genre: `blues`,
      }
    ],
  }
};

describe(`GuessArtistScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <GuessGenreScreen question={mock.question} submitHandler={mock.submitHandler} />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
