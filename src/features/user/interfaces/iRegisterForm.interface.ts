import { IUser } from "./iUser.interface";

export interface IRegisterFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  getAllUsers: () => void;
  handleDelete: (id: number | undefined) => void;
  handleOpen: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleModal: React.Dispatch<React.SetStateAction<string>>;
  titleModal: string;
  dataResponse: IUser;
  setDataResponse: React.Dispatch<React.SetStateAction<IUser>>;
}
