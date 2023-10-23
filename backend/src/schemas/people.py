from datetime import date
from typing import Optional
from pydantic import BaseModel

class CreatePersonSchema(BaseModel):
    nome: str
    rg: str
    cpf: str
    data_nascimento: date
    data_admissao: date
    funcao: Optional[str] = None

    class Config:
        orm_mode = True


class PersonSchema(CreatePersonSchema):
    id_pessoa: int
