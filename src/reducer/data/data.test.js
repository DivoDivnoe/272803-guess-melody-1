import MockAdapter from 'axios-mock-adapter';
import {Operation, reducer} from "./data";
import createAPI from '../../api';

describe(`reducer`, () => {
  it(`returns right state`, () => {
    const initialState = {
      questions: [],
    };

    const questions = [{name: `question1`}, {name: `question2`}];
    const action = {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };

    const state = reducer(initialState, action);

    expect(state.questions).toEqual(questions);
  });
});

describe(`ActionCreator`, () => {
  it(`returns right action`, () => {
    const initialState = {
      questions: [],
    };

    const questions = [{name: `question1`}, {name: `question2`}];
    const action = {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };

    const state = reducer(initialState, action);

    expect(state.questions).toEqual(questions);
  });
});

describe(`loadQuestions function`, () => {
  it(`should make a correct call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI();
    const apiMock = new MockAdapter(api);

    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}]
        });
      });
  });
});
