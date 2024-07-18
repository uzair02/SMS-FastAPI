"""
Main module for the FastAPI application.

This module sets up the FastAPI application instance, initializes database metadata,
configures CORS middleware, and includes the student controller router.

"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import student_controller
from utils.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_controller.router)
