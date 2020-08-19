import * as actionTypes from './types';

export const registerUser = ({ email, username, password }) => ({
  type: actionTypes.REGISTER_USER_REQUEST,
  email,
  username,
  password,
});

export const registerUserSuccess = (user) => ({
  type: actionTypes.REGISTER_USER_SUCCESS,
  user,
});

export const registerUserFailure = (error) => ({
  type: actionTypes.REGISTER_USER_FAILURE,
  error,
});

export const login = ({ username, password }) => ({
  type: actionTypes.LOGIN_REQUEST,
  username,
  password,
});

export const loginSuccess = (username) => ({
  type: actionTypes.LOGIN_SUCCESS,
  username
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  error
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const fetchOpinions = () => ({
  type: actionTypes.FETCH_OPINIONS_REQUEST,
});

export const fetchOpinionsSuccess = (opinions) => ({
  type: actionTypes.FETCH_OPINIONS_SUCCESS,
  opinions
});

export const fetchOpinionsFailure = () => ({
  type: actionTypes.FETCH_OPINIONS_FAILURE,
});

export const createOpinion = ({ title, content }) => ({
  type: actionTypes.CREATE_OPINION_REQUEST,
  title,
  content,
});

export const createOpinionSuccess = (opinion) => ({
  type: actionTypes.CREATE_OPINION_SUCCESS,
  opinion,
});

export const createOpinionFailure = (error) => ({
  type: actionTypes.CREATE_OPINION_FAILURE,
  error,
});

export const insertUpvote = (opinionId) => ({
  type: actionTypes.INSERT_UPVOTE_REQUEST,
  opinionId,
});

export const insertUpvoteSuccess = (opinionId) => ({
  type: actionTypes.INSERT_UPVOTE_SUCCESS,
  opinionId,
});

export const insertUpvoteFailure = () => ({
  type: actionTypes.INSERT_UPVOTE_FAILURE,
});

export const deleteUpvote = (opinionId) => ({
  type: actionTypes.DELETE_UPVOTE_REQUEST,
  opinionId,
});

export const deleteUpvoteSuccess = (opinionId) => ({
  type: actionTypes.DELETE_UPVOTE_SUCCESS,
  opinionId,
});

export const deleteUpvoteFailure = (error, opinionId) => ({
  type: actionTypes.DELETE_UPVOTE_FAILURE,
  error,
  opinionId,
});