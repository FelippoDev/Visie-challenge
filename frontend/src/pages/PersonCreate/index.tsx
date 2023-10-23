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

  function backToListPage() {
    navegate("/");
  }

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)} className="form">
        <input name="nome" className="input-person" placeholder="Name" />
        <input type="rg" name="rg" className="input-person" placeholder="RG" />
        <input name="cpf" className="input-person" placeholder="CPF" />
        <input
          type="date"
          name="data_nascimento"
          className="input-person"
          placeholder="Data de Nascimento"
        />
        <input
          type="date"
          name="data_admissao"
          className="input-person"
          placeholder="Data de Admissão"
        />
        <input name="funcao" className="input-person" placeholder="Função" />
        <input type="submit" value="Criar" className="person-form" />
        <button className="btn-input" onClick={() => backToListPage()}>
          voltar
        </button>
      </form>
    </div>
  );
}
