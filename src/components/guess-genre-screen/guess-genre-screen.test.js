import React from 'react';
import renderer from 'react-test-renderer';
import GuessGenreScreen from './guess-genre-screen.jsx';

const mock = {
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
  },
  mistakes: 5,
  changeAnswerHandler: jest.fn(),
  renderAnswer: jest.fn(),
  submitHandler: jest.fn(),
  userAnswer: [false, false, false, true],
};

describe(`GuessGenreScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <GuessGenreScreen
          question={mock.question}
          submitHandler={mock.submitHandler}
          mistakes={mock.mistakes}
          changeAnswerHandler={mock.changeAnswerHandler}
          renderAnswer={mock.renderAnswer}
          userAnswer={mock.userAnswer}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
