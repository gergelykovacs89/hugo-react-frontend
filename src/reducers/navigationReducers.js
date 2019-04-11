import {
  userConstants,
  authorConstants,
  storyRootConstants,
  textConstants
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {
  currentlyVisitedAuthorDetail: null,
  currentlyVisitedAuthorStoryRoots: {},
  currentlyVisitedAuthorTexts: {},
  currentlyVisitedStoryRootDetail: null,
  currentlyVisitedStoryRootTexts: {},
  currentLastTextIdOfStory: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGOUT:
      return {
        ...state,
        currentlyVisitedAuthorDetail: null,
        currentlyVisitedAuthorStoryRoots: {},
        currentlyVisitedAuthorTexts: {},
        currentlyVisitedStoryRootDetail: null,
        currentlyVisitedStoryRootTexts: {},
        currentlyVisitedChildTexts: {}
      };
    case authorConstants.GET_AUTHOR:
      return { ...state, currentlyVisitedAuthorDetail: action.payload };
    case storyRootConstants.SET_STORY_ROOTS_FOR_VISITED_AUTHOR: {
      return {
        ...state,
        currentlyVisitedAuthorStoryRoots: {
          ..._.mapKeys(action.payload, "_id")
        }
      };
    }
    case storyRootConstants.FETCH_STORY_ROOT:
      return {
        ...state,
        currentlyVisitedStoryRootDetail: action.payload.root,
        currentlyVisitedAuthorDetail: action.payload.author
      };
    case textConstants.LOAD_TEXT:
      return {
        ...state,
        currentlyVisitedStoryRootTexts: {
          ...state.currentlyVisitedStoryRootTexts,
          [action.payload._id]: action.payload
        },
        currentLastTextIdOfStory: action.payload._id
      };
    case textConstants.UPDATE_TEXT:
      return {
        ...state,
        currentlyVisitedStoryRootTexts: {
          ...state.currentlyVisitedStoryRootTexts,
          [action.payload._id]: action.payload
        }
      };
    case textConstants.UNLOAD_TEXT:
      return {
        ...state,
        currentlyVisitedStoryRootTexts: _.omit(
          state.currentlyVisitedStoryRootTexts,
          action.payload.textId
        ),
        currentLastTextIdOfStory: action.payload.parentId
      };
    case authorConstants.UN_SET_AUTHOR:
      return {
        ...state,
        currentlyVisitedAuthorDetail: null,
        currentlyVisitedAuthorStoryRoots: {}
      };
    case storyRootConstants.UN_SET_STORY_ROOT:
      return {
        ...state,
        currentlyVisitedStoryRootDetail: null,
        currentlyVisitedStoryRootTexts: {}
      };
    case authorConstants.FOLLOW_SUCCESS:
      return {
        ...state,
        currentlyVisitedAuthorDetail: {
          ...state.currentlyVisitedAuthorDetail,
          followers: [
            ...state.currentlyVisitedAuthorDetail.followers,
            action.payload.selectAuthorId
          ]
        }
      };
    case authorConstants.UN_FOLLOW_SUCCESS:
      return {
        ...state,
        currentlyVisitedAuthorDetail: {
          ...state.currentlyVisitedAuthorDetail,
          followers: state.currentlyVisitedAuthorDetail.followers.filter(
            authorId => authorId !== action.payload.selectAuthorId
          )
        }
      };
    case textConstants.SET_CHILD_TEXTS:
      return { ...state, currentlyVisitedChildTexts: action.payload };
    case textConstants.UNSET_CHILD_TEXTS:
      return { ...state, currentlyVisitedChildTexts: {} };
    default:
      return state;
  }
};
