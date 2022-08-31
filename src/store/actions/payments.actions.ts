import { IPaymentsProps } from "../../features/payments/interfaces/iPayments.interface";
import { SET_PAYMENTS } from "./types";

export interface IPaymentAction {
  type: string;
  payload?: {
    openModal?: boolean;
    payment?: IPaymentsProps;
  };
}

const setPayment = (
  openModal?: boolean,
  payment?: IPaymentsProps
): IPaymentAction => ({
  type: SET_PAYMENTS,
  payload: {
    openModal,
    payment,
  },
});

export default {
  setPayment,
};
