import { IChildrenProps } from "./iChildren.interface";

export interface ICattlesProps {
  id: string;
  name: string;
  date_born: string;
  namefather: string;
  proprietary: string;
  observacion: string;
  children: IChildrenProps[];
}
