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
  dateborn: null,
  observacion: "",
  proprietary: "",
  children: [
    {
      id: uuidv4(),
      name: "",
      namefather: "",
      dateborn: null,
      observacion: "",
      proprietary: "",
    },
  ],
};

export const calcPagination = (page: number) => {
  let skip = 0;
  if (page === 1) {
    skip = 0;
  } else if (page === 2) {
    skip = 5;
  } else if (page === 3) {
    skip = 10;
  } else if (page === 4) {
    skip = 15;
  } else if (page === 5) {
    skip = 20;
  } else if (page === 6) {
    skip = 25;
  } else if (page === 7) {
    skip = 30;
  } else if (page === 8) {
    skip = 35;
  } else if (page === 9) {
    skip = 40;
  } else if (page === 10) {
    skip = 45;
  } else if (page === 11) {
    skip = 50;
  } else if (page === 12) {
    skip = 55;
  } else if (page === 13) {
    skip = 60;
  } else if (page === 14) {
    skip = 65;
  } else if (page === 15) {
    skip = 70;
  } else if (page === 16) {
    skip = 75;
  } else if (page === 17) {
    skip = 80;
  } else if (page === 18) {
    skip = 85;
  } else if (page === 19) {
    skip = 90;
  } else if (page === 20) {
    skip = 95;
  }

  return skip;
};
