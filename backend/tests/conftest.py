from pytest import mark, fixture
from decouple import config
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from src.main import app
from src.schemas.people import CreatePersonSchema
from src.db.db_setup import get_db
from src.db.models.people import Person, Base
from src.cruds.people import create_person

@fixture(scope="session")
def db_config_engine():
    SQLALCHEMY_DATABASE_URL = config("TEST_SQLALCHEMY_DATABASE_URL")
    breakpoint()
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    TestingSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=engine
    )
    Base.metadata.create_all(bind=engine)
    return engine


@fixture(scope="session")
def db(db_config_engine):
    connection = db_config_engine.connect()

    # begin a non-ORM transaction
    transaction = connection.begin()

    # bind an individual Session to the connection
    db = Session(bind=connection)
    
    yield db
    db.rollback()
    connection.close()


@fixture(scope="session")
def api_client():
    return TestClient(app)


@fixture
def mocked_person():
    mocked_person = {
    "id_pessoa": 1,
    "nome": "John Doe",
    "rg": "360170154",
    "cpf": "19208877321",
    "data_nascimento": "1999-09-27",
    "data_admissao": "2023-10-23",
    "funcao": "Desenvolvedor",
    }
    return mocked_person


@fixture
def mocked_person_model(db):
    person_in = CreatePersonSchema(
        nome="John Doe",
        rg="3475131296",
        cpf="12352363262",
        data_nascimento="1999-09-27",
        data_admissao="2023-10-21",
        funcao="Desenvolvedor",
    )

    person = create_person(db=db, person=person_in)
    return person


@fixture
def update_mocked_person():
    mocked_person = {
    "nome": "Dev Tester",
    "rg": "361111111",
    "cpf": "11228877222",
    "data_nascimento": "2001-04-11",
    "data_admissao": "2023-03-03",
    "funcao": "Analista",
    }
    return mocked_person