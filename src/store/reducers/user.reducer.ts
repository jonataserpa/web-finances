import { IUserAction } from "../actions/user.actions";
import { SET_USERS } from "../actions/types";
import { IAdresses } from "../../features/user/interfaces/iAdresses";

export interface IUserState {
  send: boolean;
  address: IAdresses[];
}

const initialState: IUserState = {
  send: false,
  address: [],
};

export default function user(
  state = initialState,
  action: IUserAction = { type: "" }
): IUserState {
  const { payload } = action;

  if (action.type === SET_USERS) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}
