import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessGenreScreen from './guess-genre-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

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
  mistakes: 10,
};

describe(`GuessGenreScreen component`, () => {
  it(`reacts correctly to clicking the artist image`, () => {
    const screen = shallow(
        <GuessGenreScreen
          question={mock.question}
          submitHandler={mock.submitHandler}
          mistakes={mock.mistakes}
        />
    );

    const formSubmitPrevention = jest.fn();

    screen.find(`form`).simulate(`submit`, {
      preventDefault: formSubmitPrevention,
    });

    expect(mock.submitHandler).toHaveBeenCalledTimes(1);
    expect(formSubmitPrevention).toHaveBeenCalledTimes(1);
  });
});
