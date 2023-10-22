from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes.people import routes as people_routes
from src.db.db_setup import engine
from src.db.models import people

people.Base.metadata.create_all(bind=engine)

app = FastAPI(
    version="0.0.1",
    title="visie-backend-challenge",
    contact={
        "name": "Felippo Coelho",
        "email": "coelho.luizfelippo@gmail.com"
    }
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(people_routes, prefix="/api/v1", tags=["People"])
