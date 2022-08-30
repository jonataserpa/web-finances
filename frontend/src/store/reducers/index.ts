import { combineReducers } from "redux";
import payment, { IPaymentState } from "./payments.reducer";
import receipt, { IReceptState } from "./receipts.reducer";
import cattles, { ICattleState } from "./cattles.reducer";

export interface ICombineState {
  payment: IPaymentState;
  receipt: IReceptState;
  cattles: ICattleState;
}

export default combineReducers({
  payment,
  receipt,
  cattles,
});
