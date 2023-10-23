from sqlalchemy import Column, Date, String
from sqlalchemy.dialects.postgresql import SMALLINT
from src.db.db_setup import Base

class Person(Base):
    __tablename__ = 'pessoas'

    id_pessoa = Column(SMALLINT(), primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    rg = Column(String(100), nullable=False)
    cpf = Column(String(100), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    data_admissao = Column(Date, nullable=False)
    funcao = Column(String(100))
