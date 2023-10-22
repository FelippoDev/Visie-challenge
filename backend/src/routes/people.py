from typing import Optional, List

from fastapi import APIRouter, Path, HTTPException

from src.schemas.people import PersonSchema, CreatePersonSchema
from src.cruds import people as people_crud
from src.db.db_setup import db_dependency 

routes = APIRouter(
    prefix='/people',
    tags=['People']
)


@routes.get("", response_model=List[PersonSchema], status_code=200)
def get_people(db: db_dependency, skip: Optional[int] = None,
        limit: Optional[int] = None):
    people = people_crud.get_people(**locals())
    
    return people


@routes.get("/{person_id}", response_model=PersonSchema, status_code=200)
def get_person(db: db_dependency, person_id):
    person = people_crud.get_person(db, person_id)
    if not person:
        raise HTTPException(
            status_code=404, detail="Person not found"
        )
        
    return person


@routes.post("", response_model=PersonSchema, status_code=201)
def create_person(db: db_dependency, person: CreatePersonSchema):
    person_exists = people_crud.check_person(db=db, cpf=person.cpf, rg=person.rg)
    if person_exists:
        raise HTTPException(
            status_code=400, detail="Person already registered"
        )
    
    return people_crud.create_person(db=db, person=person)


@routes.put("/{person_id}", response_model=PersonSchema, status_code=200)
def update_person(db: db_dependency, person_id: int, person: CreatePersonSchema):
    person_model = people_crud.get_person(db, person_id)
    if not person_model:
        raise HTTPException(status_code=404, detail="Person not found")
    person = people_crud.update_person(db, person_model, person)
    return person


@routes.delete("/{person_id}", status_code=204)
def delete_person(db: db_dependency, person_id: int):
    person = people_crud.get_person(db, person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    people_crud.delete_person(db, person)
