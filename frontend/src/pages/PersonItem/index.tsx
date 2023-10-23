import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPeople } from "../Home/People.interface";
import {
  updatePerson,
  getPerson,
  deletePerson,
} from "../../services/external_api";

export default function PersonItem() {
  const { person_id } = useParams();
  const navegate = useNavigate();
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function deleteBtn(person_id: number) {
    deletePerson(person_id);
  }

  async function updateBtn(person_id: number) {
    navegate(`/update/${person_id}`);
  }

  async function getData() {
    const person: IPeople = await getPerson(person_id);
    setPersonData(person);
    setLoading(false);
  }

  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  function backToListPage(){
    navegate("/")
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
      <h2>{personData.nome}</h2>
      <p>Data de Nascimento: {formatDate(personData.data_nascimento)}</p>
      <p>Data de Admissão: {formatDate(personData.data_admissao)}</p>
      <p>RG: {personData.rg}</p>
      <p>CPF: {personData.cpf}</p>
      <p>Função: {personData.funcao}</p>
      <button
        className="table-btn"
        onClick={() => updateBtn(personData.id_pessoa)}
      >
        Editar
      </button>
      <button
        className="table-btn"
        onClick={() => deleteBtn(personData.id_pessoa)}
      >
        Remover
      </button>
      <button onClick={()=> backToListPage()} className="table-btn">Voltar</button>
    </div>
  );
}
