import * as yup from "yup";
import { IReceiveProps } from "../interfaces/iReceive.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formValidationSchemaReceipt: yup.SchemaOf<IReceiveProps | any> =
  yup.object().shape({
    description: yup.string().required().min(3),
    date_receipt: yup.string(),
    observacion: yup.string(),
    companyId: yup.string(),
    value: yup.string().required(),
    status: yup.string().required(),
  });
