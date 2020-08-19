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

export const fetchOpinion = ({ opinionId }) => ({
  type: actionTypes.FETCH_OPINION_REQUEST,
  opinionId,
});

export const fetchOpinionSuccess = () => ({
  type: actionTypes.FETCH_OPINION_SUCCESS,
});

export const fetchOpinionFailure = () => ({
  type: actionTypes.FETCH_OPINION_FAILURE,
});

export const createOpinion = ({ title, content }) => ({
  type: actionTypes.CREATE_OPINION_REQUEST,
  title,
  content,
});

export const createOpinionSuccess = () => ({
  type: actionTypes.CREATE_OPINION_SUCCESS,
});

export const createOpinionFailure = () => ({
  type: actionTypes.CREATE_OPINION_FAILURE,
});

export const insertUpvote = (opinionId) => ({
  type: actionTypes.INSERT_UPVOTE_REQUEST,
  opinionId
});

export const insertUpvoteSuccess = () => ({
  type: actionTypes.INSERT_UPVOTE_SUCCESS,
});

export const insertUpvoteFailure = (error, opinionId) => ({
  type: actionTypes.INSERT_UPVOTE_FAILURE,
  error,
  opinionId,
});

export const deleteUpvote = (opinionId) => ({
  type: actionTypes.DELETE_UPVOTE_REQUEST,
  opinionId,
});

export const deleteUpvoteSuccess = () => ({
  type: actionTypes.DELETE_UPVOTE_SUCCESS,
});

export const deleteUpvoteFailure = (error, opinionId) => ({
  type: actionTypes.DELETE_UPVOTE_FAILURE,
  error,
  opinionId,
});