import { v4 as uuidv4 } from "uuid";
import { ICattlesProps } from "../../cattles/interfaces/iCattles.interface";
import { ICompanyProps } from "../../company/interfaces/iCompany.interface";
import { IPaymentsProps } from "../../payments/interfaces/iPayments.interface";
import { IReceiveProps } from "../../receipts/interfaces/iReceive.interface";

/**
 * Initial values address
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
 * Initial values users
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
 * Initial values company
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
 * Initial values payment
 */
export const paymentInital: IPaymentsProps = {
  id: "",
  description: "",
  companyId: "",
  value: "",
  observacion: "",
  date_payment: "",
  status: "",
  datedue: "",
  typepayment: "",
};

/**
 * Initial values receipt
 */
export const receiptsInital: IReceiveProps = {
  id: "",
  description: "",
  companyId: "",
  value: "",
  observacion: "",
  date_receipt: "",
  status: "",
};

/**
 * Initial values status combo payment
 */
export const statusPayment = [
  {
    id: 1,
    name: "Pago",
  },
  {
    id: 2,
    name: "A pagar",
  },
];

/**
 * Initial values status combo receipt
 */
export const statusReceipt = [
  {
    id: 1,
    name: "A receber",
  },
  {
    id: 2,
    name: "Recebido",
  },
];

/**
 * Initial values status combo type payment
 */
export const statusTypePayment = [
  {
    id: 1,
    name: "Cheque",
  },
  {
    id: 2,
    name: "A Vista",
  },
  {
    id: 3,
    name: "Parcelado no cartão 6x",
  },
  {
    id: 4,
    name: "Parcelado no cartão 12x",
  },
  {
    id: 5,
    name: "Parcelado no cartão 24x",
  },
  {
    id: 6,
    name: "Parcelado no cartão 36x",
  },
];

/**
 * Initial values cattles
 */
export const cattleInitial: ICattlesProps = {
  id: "",
  name: "",
  namefather: "",
  date_born: "",
  observacion: "",
  proprietary: "",
  children: [
    {
      id: uuidv4(),
      name: "",
      namefather: "",
      date_born: "",
      observacion: "",
      proprietary: "",
    },
  ],
};
