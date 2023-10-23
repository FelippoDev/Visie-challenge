import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePerson } from "../../../services/external_api";
import { IPeople } from "../People.interface";
import "./styles.css";

export default function PersonList({ people }) {
  const navegate = useNavigate();

  async function deleteBtn(person_id: number) {
    deletePerson(person_id);
  }

  async function updateBtn(person_id: number) {
    navegate(`/update/${person_id}`);
  }

  async function getDetailBtn(person_id: number) {
    navegate(`/detail/${person_id}`);
  }

  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>RG</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Data de admissão</th>
            <th>Função</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.id_pessoa}</td>
              <td>{person.nome.split(" ")[0]}</td>
              <td>{person.rg}</td>
              <td>{person.cpf}</td>
              <td>{formatDate(person.data_nascimento)}</td>
              <td>{formatDate(person.data_admissao)}</td>
              <td>{person.funcao}</td>
              <td>
                <button
                  className="table-btn"
                  onClick={() => getDetailBtn(person.id_pessoa)}
                >
                  Ver mais
                </button>
                <button
                  className="table-btn"
                  onClick={() => updateBtn(person.id_pessoa)}
                >
                  Editar
                </button>
                <button
                  className="table-btn"
                  onClick={() => deleteBtn(person.id_pessoa)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
