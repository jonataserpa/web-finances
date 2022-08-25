import { combineReducers } from "redux";
import payment, { IPaymentState } from "./payments.reducer";

export interface ICombineState {
  payment: IPaymentState;
}

export default combineReducers({
  payment,
});
