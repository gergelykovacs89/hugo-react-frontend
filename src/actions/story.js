import {} from "./types";
import history from "../history";
import story from "../apis/story";

export const createStory = formValues => async dispatch => {
  try {
    console.log(formValues);
    /* const response = await story.post("/create", formValues);
    console.log(response); */
  } catch (error) {
    console.log(error);
  }
};
