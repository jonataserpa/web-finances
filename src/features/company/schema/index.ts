import { ICompanyProps } from "../interfaces/iCompany.interface";
import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formValidationSchemaCompany: yup.SchemaOf<ICompanyProps | any> =
  yup.object().shape({
    reasonsocial: yup.string().required().min(3),
    namefantasy: yup.string(),
    CNPJ: yup.string().required(),
    phone: yup.string(),
    email: yup.string(),
    address: yup.array(
      yup.object({
        id: yup.string(),
        cep: yup.string().required(),
        adrees: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
      })
    ),
  });
