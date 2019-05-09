import React from 'react';
import WelcomeScreen from './welcome-screen.jsx';
import renderer from 'react-test-renderer';

const settings = {
  gameTime: 0,
  mistakesCount: 0,
};

describe(`WelcomeScreen component`, () => {
  it(`renders correctly`, () => {
    const element = renderer.create(
        <WelcomeScreen
          settings={settings}
          clickHandler={jest.fn()}
        />
    ).toJSON();

    expect(element).toMatchSnapshot();
  });
});
