import { IUser } from "./iUser.interface";

export interface IRows {
  rows: IUser[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (user: IUser) => void;
}
