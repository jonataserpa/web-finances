import { IReceiptAction } from "../actions/receipts.actions";
import { SET_RECEIPTS } from "../actions/types";
import { IReceiveProps } from "../../features/receipts/interfaces/iReceive.interface";
import { receiptsInital } from "../../features/utils/initialValues";

export interface IReceptState {
  openModal: boolean;
  receipt: IReceiveProps;
}

const initialState: IReceptState = {
  openModal: false,
  receipt: receiptsInital,
};

export default function receipt(
  state = initialState,
  action: IReceiptAction = { type: "" }
): IReceptState {
  const { payload } = action;

  if (action.type === SET_RECEIPTS) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}
