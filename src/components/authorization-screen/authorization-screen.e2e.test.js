import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorizationScreen from './authorization-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  mistakes: 5,
  restart: jest.fn(),
  authUserHandler: jest.fn()
};

describe(`WelcomeScreen component`, () => {
  it(`works correctly after click on button`, () => {
    const {mistakes, restart, authUserHandler} = mock;

    const preventionHandler = jest.fn();

    const authorizationScreen = shallow(
        <AuthorizationScreen
          mistakes={mistakes}
          restart={restart}
          authUserHandler={authUserHandler}
        />
    );

    authorizationScreen.find(`.replay`).simulate(`click`);
    expect(restart).toHaveBeenCalledTimes(1);

    authorizationScreen.find(`form`).simulate(`submit`, {
      preventDefault: preventionHandler,
      target: {
        name: {value: `andrey@ivanov.net`},
        password: {value: `1234`}
      }
    });
    expect(preventionHandler).toHaveBeenCalledTimes(1);
    expect(authUserHandler).toHaveBeenCalledWith({
      email: `andrey@ivanov.net`,
      password: `1234`,
    });
  });
});
