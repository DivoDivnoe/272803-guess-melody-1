import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const MockComponent = () => <div />;
const renderScreen = () => <MockComponent />;

const mocks = {
  questions: [
    {
      type: `artist`,
      song: {
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
  step: 1,
};

describe(`App component`, () => {
  const {questions, step} = mocks;

  it(`renders correctly`, () => {
    const element = renderer.create(
        <App
          questions={questions}
          step={step}
          renderScreen={renderScreen}
        />
    ).toJSON();

    expect(element).toMatchSnapshot();
  });
});
