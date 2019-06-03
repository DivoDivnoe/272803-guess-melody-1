import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  mistakes: 5,
  restart: jest.fn(),
  authUserHandler: jest.fn(),
  history: {},
};

describe(`AuthorizationScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <AuthorizationScreen
            restart={mock.restart}
            authUserHandler={mock.authUserHandler}
            mistakes={mock.mistakes}
            history={mock.history}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
