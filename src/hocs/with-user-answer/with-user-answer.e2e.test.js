import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withUserAnswer from './with-user-answer';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
  submitHandler: jest.fn(),
  mistakes: 0,
};

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(<MockComponentWrapped
    question={mock.question}
    submitHandler={mock.submitHandler}
    mistakes={mock.mistakes}
  />);

  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().changeAnswerHandler(0);
  expect(wrapper.props().userAnswer).toEqual([true, false, false, false]);

  wrapper.props().changeAnswerHandler(0);
  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().changeAnswerHandler(1);
  expect(wrapper.props().userAnswer).toEqual([false, true, false, false]);
});
