import { IAdresses } from "../../features/user/interfaces/IAdresses";
import { SET_USERS } from "./types";

export interface IUserAction {
  type: string;
  payload?: {
    send?: boolean;
    address?: IAdresses[];
  };
}

const setUser = (send: boolean, address?: IAdresses[]): IUserAction => ({
  type: SET_USERS,
  payload: {
    send,
    address,
  },
});

export default {
  setUser,
};
