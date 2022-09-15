import { IChildrenProps } from "./iChildren.interface";

export interface ICattlesProps {
  id: string;
  name: string;
  dateborn: string | null;
  namefather: string;
  proprietary: string;
  observacion: string;
  children: IChildrenProps[];
}
