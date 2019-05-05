import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`WelcomeScreen component`, () => {
  it(`works correctly after click on button`, () => {
    const clickHandler = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen gameTime={3} mistakesCount={5} clickHandler={clickHandler} />
    );

    welcomeScreen.find(`.welcome__button`).simulate(`click`);

    expect(clickHandler).toHaveBeenCalled();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
