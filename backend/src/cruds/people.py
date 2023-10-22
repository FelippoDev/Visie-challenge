from sqlalchemy.orm.session import Session
from sqlalchemy import or_

from src.db.models.people import Person
from src.schemas.people import CreatePersonSchema

def get_people(db: Session, skip: int = 0, limit: int = 100):
    people = db.query(Person).offset(skip).limit(limit).all()
    return people


def get_person(db: Session, person_id: int):
    return db.query(Person).filter(Person.id_pessoa == person_id).first()


def check_person(db: Session, cpf: str, rg: str):
    return db.query(Person).filter(
        or_(Person.cpf == cpf, Person.rg == rg)
    ).first()


def create_person(db: Session, person: CreatePersonSchema):
    person = Person(**person.model_dump())
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


def update_person(db: Session, person_model, person: CreatePersonSchema):
    person_model.nome = person.nome
    person_model.rg = person.rg
    person_model.cpf = person.cpf
    person_model.data_nascimento = person.data_nascimento
    person_model.data_admissao = person.data_admissao
    person_model.funcao = person.funcao
    db.add(person_model)
    db.commit()
    db.refresh(person_model)
    return person_model


def delete_person(db: Session, person):
    db.delete(person)
    db.commit()
