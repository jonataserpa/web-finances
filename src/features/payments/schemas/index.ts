import * as yup from "yup";
import { IPaymentsProps } from "../interfaces/iPayments.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formValidationSchemaPayment: yup.SchemaOf<IPaymentsProps | any> =
  yup.object().shape({
    description: yup.string().required().min(3),
    date_payment: yup.string(),
    observacion: yup.string(),
    companyId: yup.string(),
    value: yup.string().required(),
  });
