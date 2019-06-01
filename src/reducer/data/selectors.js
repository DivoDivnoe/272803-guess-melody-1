import NameSpace from '../../name-spaces';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => state[NAME_SPACE].questions;
