import React from 'react';
import renderer from 'react-test-renderer';
import LossScreen from './loss-screen.jsx';

const mock = {
  restart: jest.fn(),
};

describe(`LossScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <LossScreen
          restart={mock.restart}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
