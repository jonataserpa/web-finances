import { IPaymentAction } from "../actions/payments.actions";
import { SET_PAYMENTS } from "../actions/types";
import { IPaymentsProps } from "../../features/payments/interfaces/iPayments.interface";
import { paymentInital } from "../../features/utils/initialValues";

export interface IPaymentState {
  openModal: boolean;
  payment: IPaymentsProps;
}

const initialState: IPaymentState = {
  openModal: false,
  payment: paymentInital,
};

export default function payment(
  state = initialState,
  action: IPaymentAction = { type: "" }
): IPaymentState {
  const { payload } = action;

  if (action.type === SET_PAYMENTS) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}
