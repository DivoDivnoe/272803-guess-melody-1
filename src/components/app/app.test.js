import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const mocks = {
  questions: [
    {
      type: `artist`,
      audio: {
        src: ``,
        artist: `Kotan Vasily`,
      },
      answers: [
        {
          picture: ``,
          artist: `Kotan Vasily`,
        },
        {
          picture: ``,
          artist: `Sobaken Polkan`,
        },
        {
          picture: ``,
          artist: `Popugay Yashka`,
        },
      ],
    }
  ],
  settings: {
    gameTime: 10,
    mistakesCount: 10,
  },
  step: 1,
  mistakes: 1,
  userAnswerHandler: jest.fn(),
  resetGame: jest.fn(),
  checkGameStatus: jest.fn()
};

describe(`App component`, () => {
  const {settings, questions, step, mistakes, userAnswerHandler, resetGame, checkGameStatus} = mocks;

  it(`renders correctly`, () => {
    const element = renderer.create(
        <App
          settings={settings}
          questions={questions}
          step={step}
          mistakes={mistakes}
          userAnswerHandler={userAnswerHandler}
          resetGame={resetGame}
          checkGameStatus={checkGameStatus}
        />
    ).toJSON();

    expect(element).toMatchSnapshot();
  });
});
