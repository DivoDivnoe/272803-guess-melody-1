import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WinScreen from './win-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  restart: jest.fn(),
  mistakes: 1,
};

describe(`WinScreen component`, () => {
  it(`works correctly after click on button`, () => {
    const {restart} = mock;

    const winScreen = shallow(
        <WinScreen
          restart={mock.restart}
          mistakes={mock.mistakes}
        />
    );

    winScreen.find(`.replay`).simulate(`click`);
    expect(restart).toHaveBeenCalledTimes(1);
  });
});
