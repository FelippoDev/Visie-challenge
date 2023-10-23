export interface IPeople {
  id_pessoa: number;
  nome: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  data_admissao: string;
  funcao: string;
}

export interface IPersonCreate {
  nome: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  data_admissao: string;
  funcao: string;
}
