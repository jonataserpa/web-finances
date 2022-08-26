export interface IPaymentsProps {
  id: string;
  description: string;
  companyId: number | null | string;
  value: string;
  status: string;
  observacion: string;
  date_payment: string;
  datedue: string;
}
