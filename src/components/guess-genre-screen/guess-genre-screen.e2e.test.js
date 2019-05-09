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
  }
};

describe(`GuessArtistScreen component`, () => {
  it(`reacts correctly to clicking the artist image`, () => {
    const screen = shallow(
        <GuessGenreScreen question={mock.question} submitHandler={mock.submitHandler} />
    );

    const formSubmitPrevention = jest.fn();

    const form = screen.find(`form`);
    const inputs = [...form.find(`input`)];

    form.simulate(`submit`, {
      preventDefault: formSubmitPrevention,
      target: {
        elements: inputs,
      },
    });

    expect(mock.submitHandler).toHaveBeenCalledTimes(1);
    expect(formSubmitPrevention).toHaveBeenCalledTimes(1);
  });
});
