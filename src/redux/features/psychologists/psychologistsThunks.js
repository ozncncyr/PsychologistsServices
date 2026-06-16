import { fetchStart, fetchSuccess, fetchFailure } from "./psychologistsSlice";
import { getPsychologists } from "../../../services/firebase/api";

export const fetchPsychologists = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const result = await getPsychologists();
    dispatch(fetchSuccess(result));
  } catch (e) {
    dispatch(fetchFailure(e.message));
  }
};
