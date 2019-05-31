import NameSpace from '../../name-spaces';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.GAME;

export const getStep = createSelector(
    (state) => state[NAME_SPACE].step,
    (step) => step
);
export const getMistakes = createSelector(
    (state) => state[NAME_SPACE].mistakes,
    (mistakes) => mistakes
);
