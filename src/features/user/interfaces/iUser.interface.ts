/**
 * Creation Date: 2022-06-22
 * Author Jonata Serpa
 */

import { IAdresses } from "./IAdresses";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  companyId: number;
  dateborn?: string;
  radiogender?: string;
  address?: IAdresses[];
  password?: string;

}
