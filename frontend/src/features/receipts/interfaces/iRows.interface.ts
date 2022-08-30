import { IReceiveProps } from "./iReceive.interface";

export interface IRows {
  rows: IReceiveProps[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (company: IReceiveProps) => void;
}
