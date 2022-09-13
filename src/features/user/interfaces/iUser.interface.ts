/**
 * Creation Date: 2022-06-22
 * Author Jonata Serpa
 */

import { IAdresses } from "./iAdresses";

interface DynamicKey {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IUser extends DynamicKey {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  companyId?: number | undefined;
  dateborn?: string | undefined;
  radiogender?: string;
  address?: IAdresses[];
  password?: string;
}
