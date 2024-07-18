"""
This module defines Pydantic schemas for student-related operations.
"""

import re
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, validator

class StudentBase(BaseModel):
    """
    Schema representing the base fields for creating and updating a student.

    Attributes:
        first_name (str): First name of the student.
        last_name (str): Last name of the student.
        age (int): Age of the student.
        email (EmailStr): Email address of the student.
    """
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    age: int = Field(..., ge=18, le=35)
    email: EmailStr

    @validator('first_name', 'last_name')
    @classmethod
    def name_must_not_contain_numbers(cls, value):
        """Validate that the name does not contain numbers."""
        if any(char.isdigit() for char in value):
            raise ValueError('Name must not contain numbers')
        return value

    @validator('first_name', 'last_name')
    @classmethod
    def name_must_be_alphabetic(cls, value):
        """Validate that the name contains only alphabetic characters, spaces, or hyphens."""
        if not re.match(r'^[a-zA-Z\s-]+$', value):
            raise ValueError('Name must only contain letters, spaces, or hyphens')
        return value

class StudentCreate(StudentBase):
    """
    Schema representing the fields required to create a new student.
    Inherits: StudentBase: Base schema with common student fields.
    """

class Student(StudentBase):
    """
    Schema representing a student with a unique identifier.

    Attributes:
        student_id (UUID): Unique identifier for the student.
    """
    student_id: UUID

    class Config:
        """Configuration for the Pydantic model."""
        orm_mode = True
