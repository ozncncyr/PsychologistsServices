import { fetchStart, fetchSuccess, fetchFailure } from "./psychologistsSlice";
import { getPsychologists } from "../../../services/firebase/api";

export const fetchPsychologists = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const items = await getPsychologists();
    dispatch(fetchSuccess(items));
  } catch (e) {
    dispatch(fetchFailure(e.message));
  }
};
