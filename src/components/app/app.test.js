import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const settings = {
  gameTime: 10,
  mistakesCount: 10,
};

const questions = [
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
];

describe(`App component`, () => {
  it(`renders correctly`, () => {
    const element = renderer.create(<App settings={settings} questions={questions} />).toJSON();

    expect(element).toMatchSnapshot();
  });
});
