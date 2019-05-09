import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const settings = {
  gameTime: 100,
  mistakesCount: 100,
};

describe(`WelcomeScreen component`, () => {
  it(`works correctly after click on button`, () => {
    const clickHandler = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen settings={settings} clickHandler={clickHandler} />
    );

    welcomeScreen.find(`.welcome__button`).simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
