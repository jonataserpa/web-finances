import { ICompanyProps } from "./iCompany.interface";

export interface IRegisterFormCompanyProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  getAllUsers: () => void;
  handleDelete: (id: string | undefined) => void;
  handleOpen: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleModal: React.Dispatch<React.SetStateAction<string>>;
  titleModal: string;
  dataResponse: ICompanyProps;
  setDataResponse: React.Dispatch<React.SetStateAction<ICompanyProps>>;
}
