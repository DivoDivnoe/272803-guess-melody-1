import NameSpace from '../../name-spaces';

const NAME_SPACE = NameSpace.GAME;

export const getStep = (state) => state[NAME_SPACE].step;
export const getMistakes = (state) => state[NAME_SPACE].mistakes;
