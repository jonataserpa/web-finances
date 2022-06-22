/**
 * Creation Date: 2022-06-22
 * Author Jonata Serpa
 */

export interface ILogradouros {
    cep?: string;
    logradouro?: string;
    number?: Number;
    uf?: string;
    city?: string;
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    smartphone?: string;
    companyId: number;
    dateborn?: string;
    gender?: string;
    logradouros?: ILogradouros[];
    password?: string;
}