import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  mistakes: 2,
  restart: jest.fn(),
};

describe(`WinScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <WinScreen
            restart={mock.restart}
            mistakes={mock.mistakes}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
