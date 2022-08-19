import { combineReducers } from "redux";
import user, { IUserState } from "./user.reducer";

export interface ICombineState {
  user: IUserState;
}

export default combineReducers({
  user,
});
