import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPeople } from "./People.interface";
import PeopleTable from "./PersonList/index";
import { createPerson, fetchPeopleData } from "../../services/external_api";

export default function HomePage() {
  const [peopleList, setPeopleList] = useState([] as IPeople[]);
  const [loading, setLoading] = useState(true);
  const navegate = useNavigate();

  async function getData() {
    try {
      const data = await fetchPeopleData();
      setPeopleList(data);
      setLoading(!loading);
    } catch (error) {
      console.log(error);
    }
  }

  async function createPerson() {
    navegate("/create");
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <article>
        <header>
          <h1>React: Frontend Technical challenge CRUD</h1>
        </header>
      </article>
      <section className="section-content">
        <h2>Tabela Pessoas</h2>
        <button onClick={() => createPerson()} className="create-btn">
          adicionar novo registro
        </button>
        <PeopleTable people={peopleList} />
      </section>
    </div>
  );
}
