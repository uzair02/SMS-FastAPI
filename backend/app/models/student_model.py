"""
Module defining the SQLAlchemy model for the Student entity.

This module defines the SQLAlchemy model `Student`, representing a student
in the database with attributes such as student_id, first_name, last_name, age, and email.

"""

import uuid
from sqlalchemy import String, Integer, Column
from sqlalchemy.dialects.postgresql import UUID
from utils.database import Base

class Student(Base):
    """
    Represents a student in the database.

    Attributes:
        __tablename__ (str): The name of the database table where students are stored.
        student_id (UUID): Unique identifier for the student (primary key).
        first_name (str): First name of the student.
        last_name (str): Last name of the student.
        age (int): Age of the student.
        email (str): Email address of the student (must be unique).

    """
    __tablename__ = "studentsmygithub"
    student_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(100), nullable=False, unique=True)
