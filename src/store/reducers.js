import * as actionTypes from './types';
import { logout } from '../services/auth';
import history from '../history';

export default (state = {}, action) => {
  switch(action.type) {
    case actionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          error: undefined,
        }
      };
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
        },
      };
    case actionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: action.error
        }
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
          error: undefined,
        }
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          username: action.username
        }
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.error
        }
      };
    case actionTypes.LOGOUT:
      logout();
      history.push('/login');
      return {};
    case actionTypes.FETCH_OPINIONS_REQUEST:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          loading: true,
          error: undefined,
        }
      };
    case actionTypes.FETCH_OPINIONS_SUCCESS:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          ...action.opinions,
          loading: false,
        },
      };
    case actionTypes.FETCH_OPINIONS_FAILURE:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          loading: false,
          error: action.error,
        },
      };
    case actionTypes.INSERT_UPVOTE_REQUEST:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: undefined,
        }
      };
    case actionTypes.INSERT_UPVOTE_SUCCESS:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: undefined,
          content: {
            ...state.opinions.content,
            [action.opinionId]: {
              ...state.opinions.content[action.opinionId],
              upvotes_count: state.opinions.content[action.opinionId].upvotes_count + 1,
            }
          }
        }
      };
    case actionTypes.INSERT_UPVOTE_FAILURE:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: action.error,
        }
      };
    case actionTypes.DELETE_UPVOTE_REQUEST:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: undefined,
        }
      };
    case actionTypes.DELETE_UPVOTE_SUCCESS:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: undefined,
          content: {
            ...state.opinions.content,
            [action.opinionId]: {
              ...state.opinions.content[action.opinionId],
              upvotes_count: state.opinions.content[action.opinionId].upvotes_count - 1,
            }
          }
        }
      };
    case actionTypes.DELETE_UPVOTE_FAILURE:
      return {
        ...state,
        opinions: {
          ...state.opinions,
          error: action.error,
        }
      };
    case actionTypes.CREATE_OPINION_REQUEST:
      return {
        ...state,
        opinion: {
          loading: true,
          error: undefined,
        }
      };
    case actionTypes.CREATE_OPINION_SUCCESS:
      return {
        ...state,
        opinion: {
          ...state.opinion,
          ...action.opinion,
          loading: false,
        },
        opinions: {
          ...state.opinions,
          ids: [
            ...state.opinions.ids,
            action.opinion.id,
          ],
          content: {
            ...state.opinions.content,
            [action.opinion.id]: {...action.opinion, upvotes_count: 0},
          },
        }
      };
    case actionTypes.CREATE_OPINION_FAILURE:
      return {
        ...state,
        opinion: {
          ...state.opinion,
          error: action.error,
        }
      };
    default:
      return state;
  }
}