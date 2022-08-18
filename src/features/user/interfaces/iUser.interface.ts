/**
 * Creation Date: 2022-06-22
 * Author Jonata Serpa
 */

import { IAdresses } from "./IAdresses";

interface DynamicKey {
  [key: string]: any;
}

export interface IUser extends DynamicKey {
  id?: string;
  name: string;
  email: string;
  phone: string;
  companyId: number | undefined;
  dateborn: string | undefined;
  radiogender?: string;
  address?: IAdresses[];
  password?: string;

}
