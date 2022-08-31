import { IPaymentsProps } from "./iPayments.interface";

export interface IRows {
  rows: IPaymentsProps[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (company: IPaymentsProps) => void;
}
