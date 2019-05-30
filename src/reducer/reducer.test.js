import MockAdapter from 'axios-mock-adapter';
import ActionCreator, {reducer, checkIsGameOver, Operation} from "./reducer";
import api from '../api';

describe(`reducer returns right state with`, () => {
  it(`INCREMENT_STEP action`, () => {
    const initialState = {
      step: 5,
      mistakes: 1,
    };
    const action = {
      type: `INCREMENT_STEP`,
      payload: 1,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      step: 6,
      mistakes: 1,
    });
  });

  it(`INCREMENT_MISTAKES action payload: 0`, () => {
    const initialState = {
      step: 2,
      mistakes: 0,
    };
    const action = {
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(state);
  });

  it(`INCREMENT_MISTAKES action payload: 1`, () => {
    const initialState = {
      step: 5,
      mistakes: 2,
    };
    const action = {
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      step: 5,
      mistakes: 3,
    });
  });
});

describe(`ActionCreator INCREMENT_MISTAKES`, () => {
  describe(`with question type "artist"`, () => {
    it(`returns right action, when the answer is wrong`, () => {
      const question = {
        type: `artist`,
        audio: {
          src: ``,
          artist: `Shura`,
        },
        answers: [
          {
            picture: ``,
            artist: `Shura`,
          },
          {
            picture: ``,
            artist: `Kolya`,
          },
          {
            picture: ``,
            artist: `Borya`,
          },
        ],
      };

      const userAnswer = `Borya`;
      const action = ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer);

      expect(action).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1,
      });
    });

    it(`returns right action, when the answer is right`, () => {
      const question = {
        type: `artist`,
        audio: {
          src: ``,
          artist: `Kolya`,
        },
        answers: [
          {
            picture: ``,
            artist: `Shura`,
          },
          {
            picture: ``,
            artist: `Kolya`,
          },
          {
            picture: ``,
            artist: `Borya`,
          },
        ],
      };

      const userAnswer = `Kolya`;
      const action = ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer);

      expect(action).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 0,
      });
    });
  });

  describe(`with question type "genre"`, () => {
    it(`returns right action, when the answer is wrong`, () => {
      const question = {
        type: `genre`,
        genre: `blues`,
        answers: [
          {
            src: ``,
            genre: `blues`,
          },
          {
            src: ``,
            genre: `rock`,
          },
          {
            src: ``,
            genre: `pop`,
          },
          {
            src: ``,
            genre: `rock`,
          },
        ],
      };

      const userAnswer = [false, false, true, false];
      const action = ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer);

      expect(action).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1,
      });
    });

    it(`returns right action, when the answer is right`, () => {
      const question = {
        type: `genre`,
        genre: `blues`,
        answers: [
          {
            src: ``,
            genre: `blues`,
          },
          {
            src: ``,
            genre: `rock`,
          },
          {
            src: ``,
            genre: `pop`,
          },
          {
            src: ``,
            genre: `rock`,
          },
        ],
      };

      const userAnswer = [true, false, false, false];
      const action = ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer);

      expect(action).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 0,
      });
    });

    it(`returns right action, when the answer is partly right`, () => {
      const question = {
        type: `genre`,
        genre: `rock`,
        answers: [
          {
            src: ``,
            genre: `blues`,
          },
          {
            src: ``,
            genre: `rock`,
          },
          {
            src: ``,
            genre: `pop`,
          },
          {
            src: ``,
            genre: `rock`,
          },
        ],
      };

      const userAnswer = [false, true, true, true];
      const action = ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer);

      expect(action).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1,
      });
    });
  });
});

describe(`checkIsGameOver function`, () => {
  it(`returns true, when currentStep is equal to number of questions`, () => {
    const gameMistakes = 1;
    const numberOfQuestions = 4;
    const currentMistakes = 0;
    const currentStep = 4;

    const gameIsOver = checkIsGameOver(gameMistakes, numberOfQuestions, currentMistakes, currentStep);

    expect(gameIsOver).toBe(true);
  });

  it(`returns true, when currentMistakes is equal to number of game mistakes`, () => {
    const gameMistakes = 5;
    const numberOfQuestions = 4;
    const currentMistakes = 5;
    const currentStep = 2;

    const gameIsOver = checkIsGameOver(gameMistakes, numberOfQuestions, currentMistakes, currentStep);

    expect(gameIsOver).toBe(true);
  });

  it(`returns false, when currentMistakes and currentStep are smaller then game mistakes and questions amount`, () => {
    const gameMistakes = 5;
    const numberOfQuestions = 4;
    const currentMistakes = 2;
    const currentStep = 3;

    const gameIsOver = checkIsGameOver(gameMistakes, numberOfQuestions, currentMistakes, currentStep);

    expect(gameIsOver).toBe(false);
  });
});

describe(`loadQuestions function`, () => {
  it(`should make a correct call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    questionLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}]
        });
      });
  });
});
