import React from 'react';
import WelcomeScreen from './welcome-screen.jsx';
import renderer from 'react-test-renderer';

describe(`WelcomeScreen component`, () => {
  it(`renders correctly`, () => {
    const element = renderer.create(<WelcomeScreen gameTime={0} mistakesCount={0} clickHandler={jest.fn()} />).toJSON();

    expect(element).toMatchSnapshot();
  });
});
