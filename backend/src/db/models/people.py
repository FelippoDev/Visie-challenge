from sqlalchemy import Column, Date, String, Integer
from sqlalchemy.dialects.mysql import TINYINT
from src.db.db_setup import Base

class Person(Base):
    __tablename__ = 'pessoas'

    id_pessoa = Column(Integer(), primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    rg = Column(String(100), nullable=False, unique=True)
    cpf = Column(String(100), nullable=False, unique=True)
    data_nascimento = Column(Date, nullable=False)
    data_admissao = Column(Date, nullable=False)
    funcao = Column(String(100))
