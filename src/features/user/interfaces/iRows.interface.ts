import { IUser } from "./iUser.interface";

export interface IRows {
  rows: IUser[];
  handleDelete: (id: number | undefined) => void;
  handleEdit: (user: IUser) => void;
}
