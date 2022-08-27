import * as yup from "yup";
import { ICattlesProps } from "../interfaces/iCattles.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formValidationSchemaCattles: yup.SchemaOf<ICattlesProps | any> =
  yup.object().shape({
    name: yup.string().required().min(3),
    date_born: yup.string(),
    observacion: yup.string(),
    namefather: yup.string(),
    proprietary: yup.string().required(),
    children: yup.array(
      yup.object({
        id: yup.string(),
        name: yup.string(),
        date_born: yup.string(),
        namefather: yup.string(),
        proprietary: yup.string(),
        observacion: yup.string(),
      })
    ),
  });
