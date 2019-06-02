import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';

const mock = {
  mistakes: 2,
  restart: jest.fn(),
};

describe(`WinScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <WinScreen
          restart={mock.restart}
          mistakes={mock.mistakes}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
