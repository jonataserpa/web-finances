import { IReceiveProps } from "../../features/receipts/interfaces/iReceive.interface";
import { SET_RECEIPTS } from "./types";

export interface IReceiptAction {
  type: string;
  payload?: {
    openModal?: boolean;
    receipt?: IReceiveProps;
  };
}

const setReceipt = (
  openModal?: boolean,
  receipt?: IReceiveProps
): IReceiptAction => ({
  type: SET_RECEIPTS,
  payload: {
    openModal,
    receipt,
  },
});

export default {
  setReceipt,
};
