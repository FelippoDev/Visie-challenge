from typing import Annotated
from fastapi import Depends
from starlette.config import Config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

config = Config(".env")

DB_USER = config("DB_USER")
HOST = config("HOST")
PORT = config("PORT")
DB_PASSWORD = config("DB_PASSWORD")
DB_NAME = config("DB_NAME")

SQLALCHEMY_DATABASE_URL = F'postgresql://{DB_USER}:{DB_PASSWORD}@{HOST}:{PORT}/{DB_NAME}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
