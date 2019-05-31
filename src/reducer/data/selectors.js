import NameSpace from '../../name-spaces';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = createSelector(
    (state) => state[NAME_SPACE].questions,
    (questions) => questions
);
