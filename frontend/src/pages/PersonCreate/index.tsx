import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPersonCreate } from "../Home/People.interface";
import { createPerson } from "../../services/external_api";

export default function PersonCreate() {
  const navegate = useNavigate();
  async function submitForm(e: any) {
    e.preventDefault();
    const person: IPersonCreate = {
      nome: e.target.nome.value,
      rg: e.target.rg.value,
      cpf: e.target.cpf.value,
      data_nascimento: e.target.data_nascimento.value,
      data_admissao: e.target.data_admissao.value,
      funcao: e.target.funcao.value,
    };
    let response = await createPerson(person);
    if (response) {
      navegate("/");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)} className="form">
        <input
          type="nome"
          name="nome"
          className="input-person"
          placeholder="Name"
        />
        <input
          type="rg"
          name="rg"
          className="input-person"
          placeholder="RG"
        />
        <input
          type="cpf"
          name="cpf"
          className="input-person"
          placeholder="CPF"
        />
        <input
          type="data_nascimento"
          name="data_nascimento"
          className="input-person"
          placeholder="Data de Nascimento"
        />
        <input
          type="data_admissao"
          name="data_admissao"
          className="input-person"
          placeholder="Data de Admissão"
        />
        <input
          type="funcao"
          name="funcao"
          className="input-person"
          placeholder="Função"
        />
        <input type="submit" value="Criar" className="person-form" />
      </form>
    </div>
  );
}
