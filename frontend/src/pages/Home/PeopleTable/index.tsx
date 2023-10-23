import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePerson } from "../../../services/external_api";
import { IPeople } from "../People.interface";
import "./styles.css";

export default function PeopleTable({ people }) {
  const navegate = useNavigate();
  async function deleteBtn(person_id: number){
    deletePerson(person_id)
  }


  async function updateBtn(person_id: number){
    navegate(`/update/${person_id}`)
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
              <td>{person.nome}</td>
              <td>{person.rg}</td>
              <td>{person.cpf}</td>
              <td>{person.data_nascimento}</td>
              <td>{person.data_admissao}</td>
              <td>{person.funcao}</td>
              <td>
                <button className="update-person" onClick={() => updateBtn(person.id_pessoa)}>Atualizar</button>
                <button className="update-person" onClick={() => deleteBtn(person.id_pessoa)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
