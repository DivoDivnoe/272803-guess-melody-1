import React from 'react';
import renderer from 'react-test-renderer';
import MistakesView from './mistakes-view.jsx';

const mock = {
  mistakes: 5,
};

describe(`MistakesView component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <MistakesView mistakes={mock.mistakes} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
