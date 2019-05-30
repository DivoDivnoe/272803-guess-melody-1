import api from '../api';

const initialState = {
  step: -1,
  mistakes: 0,
  questions: [],
};
Object.freeze(initialState);


export const Operation = {
  loadQuestions: () => (dispatch) => {
    return api.get(`/questions`)
      .then((response) => dispatch(ActionCreator[`LOAD_QUESTIONS`](response.data)));
  }
};


const ActionCreator = {
  INCREMENT_STEP: () => {
    return {
      type: `INCREMENT_STEP`,
      payload: 1,
    };
  },

  INCREMENT_MISTAKES: (question, userAnswer) => {
    let isAnswerCorrect;

    if (!question) {
      isAnswerCorrect = true;
    } else {
      switch (question.type) {
        case `artist`:
          isAnswerCorrect = question.song.artist === userAnswer;
          break;

        case `genre`:
          isAnswerCorrect = question.answers.every(
              (answer, index) => (answer.genre === question.genre) === userAnswer[index]
          );
          break;
      }
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: +!isAnswerCorrect,
    };
  },

  LOAD_QUESTIONS: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },

  RESET_STATE: () => ({type: `RESET_STATE`}),
};

export const checkIsGameOver = (gameMistakes, numberOfquestions, currentMistakes, currentStep) => {
  return currentMistakes >= gameMistakes || currentStep >= numberOfquestions;
};

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {step: state.step + payload});
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {mistakes: state.mistakes + payload});
    case `RESET_STATE`:
      return initialState;
    case `LOAD_QUESTIONS`:
      return Object.assign({}, state, {questions: payload});
  }

  return state;
};

export default ActionCreator;
