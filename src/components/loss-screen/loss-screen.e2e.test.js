import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LossScreen from './loss-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  restart: jest.fn(),
};

describe(`LossScreen component`, () => {
  it(`works correctly after click on button`, () => {
    const {restart} = mock;

    const lossScreen = shallow(
        <LossScreen
          restart={mock.restart}
        />
    );

    lossScreen.find(`.replay`).simulate(`click`);
    expect(restart).toHaveBeenCalledTimes(1);
  });
});
