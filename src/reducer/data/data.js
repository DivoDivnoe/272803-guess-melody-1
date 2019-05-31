const initialState = {
  questions: [],
};
Object.freeze(initialState);


export const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => dispatch(ActionCreator[`LOAD_QUESTIONS`](response.data)));
  }
};

const ActionCreator = {
  LOAD_QUESTIONS: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },
};

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `LOAD_QUESTIONS`:
      return Object.assign({}, state, {questions: payload});
  }

  return state;
};

export default ActionCreator;
