import { ICattlesProps } from "../../features/cattles/interfaces/iCattles.interface";
import { SET_CATTLES } from "./types";

export interface ICattlesAction {
  type: string;
  payload?: {
    cattles?: ICattlesProps;
  };
}

const setCattles = (cattles?: ICattlesProps): ICattlesAction => ({
  type: SET_CATTLES,
  payload: {
    cattles,
  },
});

export default {
  setCattles,
};
