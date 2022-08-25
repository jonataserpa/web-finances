import { v4 as uuidv4 } from "uuid";
import { ICompanyProps } from "../../company/interfaces/iCompany.interface";
import { IPaymentsProps } from "../../payments/interfaces/iPayments.interface";

/**
 * Initil values address
 */
export const address = [
  {
    id: uuidv4(),
    cep: "",
    adrees: "",
    number_end: "",
    state: "",
    city: "",
  },
];

/**
 * Initil values users
 */
export const user = {
  name: "",
  email: "",
  phone: "",
  companyId: undefined,
  dateborn: "",
  radiogender: "",
  address,
};

/**
 * Initil values company
 */
export const company: ICompanyProps = {
  id: "",
  reasonsocial: "",
  namefantasy: "",
  CNPJ: "",
  phone: "",
  email: "",
  address,
};

/**
 * Initil values payment
 */
export const paymentInital: IPaymentsProps = {
  id: "",
  description: "",
  companyId: null,
  value: "",
  observacion: "",
  date_payment: "",
};
