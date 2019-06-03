import React from 'react';
import renderer from 'react-test-renderer';
import LossScreen from './loss-screen.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  restart: jest.fn(),
};

describe(`LossScreen component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <LossScreen
            restart={mock.restart}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
