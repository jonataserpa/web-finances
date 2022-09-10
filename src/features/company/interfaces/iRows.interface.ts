import { ICompanyProps } from "./iCompany.interface";

export interface IRows {
  rows: ICompanyProps[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (company: ICompanyProps) => void;
}
