import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`App component`, () => {
  it(`renders correctly`, () => {
    const element = renderer.create(<App gameTime={100} mistakesCount={100} />).toJSON();

    expect(element).toMatchSnapshot();
  });
});
