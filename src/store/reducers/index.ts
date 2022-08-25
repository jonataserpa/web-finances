import { combineReducers } from "redux";
import payment, { IPaymentState } from "./payments.reducer";
import receipt, { IReceptState } from "./receipts.reducer";

export interface ICombineState {
  payment: IPaymentState;
  receipt: IReceptState;
}

export default combineReducers({
  payment,
  receipt,
});
