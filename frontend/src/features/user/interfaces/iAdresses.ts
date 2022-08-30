/**
 * Creation Date: 2022-07-12
 * Author Jonata Serpa
 */

interface DynamicKey {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
