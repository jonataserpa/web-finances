import { v4 as uuidv4 } from "uuid";
import { ICompanyProps } from "../../company/interfaces/iCompany.interface";

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

export const user = {
  name: "",
  email: "",
  phone: "",
  companyId: undefined,
  dateborn: "",
  radiogender: "",
  address,
};

export const company: ICompanyProps = {
  id: "",
  reasonsocial: "",
  namefantasy: "",
  CNPJ: "",
  phone: "",
  email: "",
  address,
};
