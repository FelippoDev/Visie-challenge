import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPeople } from "../Home/People.interface";
import { updatePerson, getPerson } from "../../services/external_api";

export default function PersonUpdate() {
  const { person_id } = useParams();
  const navegate = useNavigate();
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const person: IPeople = await getPerson(person_id);
    console.log(person);
    setPersonData(person);
    setLoading(false);
  }

  async function submitForm(e: any) {
    e.preventDefault();
    const person: IPeople = {
      id_pessoa: person_id,
      nome: e.target.nome.value,
      rg: e.target.rg.value,
      cpf: e.target.cpf.value,
      data_nascimento: e.target.data_nascimento.value,
      data_admissao: e.target.data_admissao.value,
      funcao: e.target.funcao.value,
    };
    let response = await updatePerson(person);
    if (response) {
      navegate("/");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)} className="form">
        <input
          type="nome"
          name="nome"
          className="input-person"
          placeholder="Name"
          defaultValue={personData.nome}
        />
        <input
          type="rg"
          name="rg"
          className="input-person"
          placeholder="RG"
          defaultValue={personData.rg}
        />
        <input
          type="cpf"
          name="cpf"
          className="input-person"
          placeholder="CPF"
          defaultValue={personData.cpf}
        />
        <input
          type="data_nascimento"
          name="data_nascimento"
          className="input-person"
          placeholder="Data de Nascimento"
          defaultValue={personData.data_nascimento}
        />
        <input
          type="data_admissao"
          name="data_admissao"
          className="input-person"
          placeholder="Data de Admissão"
          defaultValue={personData.data_admissao}
        />
        <input
          type="funcao"
          name="funcao"
          className="input-person"
          placeholder="Função"
          defaultValue={personData.funcao}
        />
        <input type="submit" value="Atualizar" className="person-form" />
      </form>
    </div>
  );
}
