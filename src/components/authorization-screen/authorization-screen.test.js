import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

const mock = {
  mistakes: 5,
  restart: jest.fn(),
  authUserHandler: jest.fn()
};

describe(`AuthorizationScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <AuthorizationScreen
          restart={mock.restart}
          authUserHandler={mock.authUserHandler}
          mistakes={mock.mistakes}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
