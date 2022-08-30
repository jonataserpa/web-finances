import { ICattlesProps } from "./iCattles.interface";

export interface IRows {
  rows: ICattlesProps[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (cattles: ICattlesProps) => void;
}
