import NameSpaces from '../../name-spaces';

const NAME_SPACE = NameSpaces.USER;

export const getAuthorizationRequired = (state) => state[NAME_SPACE].isAuthorizationRequired;
export const getUserData = (state) => state[NAME_SPACE].userData;
