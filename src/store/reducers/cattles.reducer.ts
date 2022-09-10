import { SET_CATTLES } from "../actions/types";
import { cattleInitial } from "../../features/utils/initialValues";
import { ICattlesProps } from "../../features/cattles/interfaces/iCattles.interface";
import { ICattlesAction } from "../actions/cattles.actions";

export interface ICattleState {
  cattles: ICattlesProps;
}

const initialState: ICattleState = {
  cattles: cattleInitial,
};

export default function cattles(
  state = initialState,
  action: ICattlesAction = { type: "" }
): ICattleState {
  const { payload } = action;

  if (action.type === SET_CATTLES) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}
