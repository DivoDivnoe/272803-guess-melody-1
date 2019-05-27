import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withCurrentTrack from './with-current-track';

configure({adapter: new Adapter()});

const mock = {
  submitHandler: jest.fn(),
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: ``,
        genre: `pop`,
      },
      {
        src: ``,
        genre: `rock`,
      },
      {
        src: ``,
        genre: `blues`,
      }
    ],
  },
  mistakes: 1,
  changeAnswerHandler: jest.fn(),
  userAnswer: [true, true, true, true]
};

const MockComponent = () => <div />;
const MockComponentWrapped = withCurrentTrack(MockComponent);

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        question={mock.question}
        mistakes={mock.mistakes}
        submitHandler={mock.submitHandler}
        changeAnswerHandler={mock.changeAnswerHandler}
        userAnswer={mock.userAnswer}
      />);

  expect(wrapper.state().currentTrack).toEqual(-1);
});
