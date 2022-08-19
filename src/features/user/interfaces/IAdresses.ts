/**
 * Creation Date: 2022-07-12
 * Author Jonata Serpa
 */

interface DynamicKey {
  [key: string]: any;
}
export interface IAdresses extends DynamicKey {
  id?: string;
  cep: string;
  adrees: string;
  number_end: string;
  state: string;
  city: string;
}
