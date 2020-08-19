import { put, call, takeLatest, all } from "redux-saga/effects";

import history from "../history";
import { normalize } from "../utils";
import api from "../services/api";
import { login as authLogin } from "../services/auth";
import * as actions from "./actions";
import {
  REGISTER_USER_REQUEST,
  LOGIN_REQUEST,
  FETCH_OPINIONS_REQUEST,
  FETCH_OPINION_REQUEST,
  CREATE_OPINION_REQUEST,
  INSERT_UPVOTE_REQUEST,
  DELETE_UPVOTE_REQUEST,
} from "./types";

export function* registerUser({ email, username, password }) {
  try {
    const res = yield call(api.post, "/register", {
      email,
      username,
      password,
    });
    yield put(actions.registerUserSuccess());
    history.push("/login");
  } catch (error) {
    yield put(
      actions.registerUserFailure({
        message: error.response.data.error,
        status: error.response.status,
      })
    );
  }
}

export function* login({ username, password }) {
  try {
    const res = yield call(api.post, "/login", { username, password });
    authLogin(res.data.token);
    yield put(actions.loginSuccess(username));
    history.push("/");
  } catch (error) {
    yield put(
      actions.loginFailure({
        message: error.response.data.error,
        status: error.response.status,
      })
    );
  }
}

export function* fetchOpinions() {
  try {
    const { data } = yield call(api.get, "/opinions");
    yield put(actions.fetchOpinionsSuccess(normalize(data.opinions, "id")));
  } catch (error) {
    yield put(
      actions.fetchOpinionsFailure({
        message: error.response.data.error,
        status: error.response.status,
      })
    );
  }
}

export function* fetchOpinion() {}

export function* createOpinion() {}

export function* insertUpvote({ opinionId }) {
  try {
    yield call(api.post, `/opinions/${opinionId}/vote`);
    yield put(actions.insertUpvoteSuccess());
  } catch (error) {
    yield put(
      actions.insertUpvoteFailure(
        { message: error.response.data.error, status: error.response.status },
        opinionId
      )
    );
  }
}

export function* deleteUpvote({ opinionId }) {
  try {
    yield call(api.delete, `/opinions/${opinionId}/vote`);
    yield put(actions.deleteUpvoteSuccess());
  } catch (error) {
    yield put(
      actions.deleteUpvoteFailure(
        { message: error.response.data.error, status: error.response.status },
        opinionId
      )
    );
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(REGISTER_USER_REQUEST, registerUser),
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(FETCH_OPINIONS_REQUEST, fetchOpinions),
    takeLatest(FETCH_OPINION_REQUEST, fetchOpinion),
    takeLatest(CREATE_OPINION_REQUEST, createOpinion),
    takeLatest(INSERT_UPVOTE_REQUEST, insertUpvote),
    takeLatest(DELETE_UPVOTE_REQUEST, deleteUpvote),
  ]);
}
