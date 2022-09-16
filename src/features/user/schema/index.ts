import { IUser } from "../interfaces/iUser.interface";
import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formValidationSchema: yup.SchemaOf<IUser | any> = yup
  .object()
  .shape({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    companyId: yup.number().required(),
    dateborn: yup.string().required().nullable(),
    radiogender: yup.string().required(),
    phone: yup.string().required(),
    address: yup.array(
      yup.object({
        id: yup.string(),
        cep: yup.string(),
        adrees: yup.string(),
        city: yup.string(),
        state: yup.string(),
        // cep: yup.string().required(),
        // adrees: yup.string().required(),
        // city: yup.string().required(),
        // state: yup.string().required(),
      })
    ),
  });
