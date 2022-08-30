import { IAdresses } from "../../user/interfaces/iAdresses";

export interface ICompanyProps {
  id: string;
  reasonsocial: string;
  namefantasy: string;
  CNPJ: string;
  phone: string;
  email: string;
  address?: IAdresses[];
}
