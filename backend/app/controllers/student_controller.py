"""
Controller module for student-related operations using FastAPI.

This module defines various HTTP endpoints for CRUD operations on students,
utilizing SQLAlchemy for database interaction and Pydantic schemas for data validation.
It also supports pagination for retrieving students.

"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page, add_pagination
from schemas.student_schema import StudentCreate, Student
from services import student_service
from utils.database import get_db
from utils.error_messages import ErrorMessage
from utils.logging_config import logger

router = APIRouter()

@router.get("/students", response_model=Page[Student])
async def read_students(db: Session = Depends(get_db)) -> Page[Student]:
    """
    Retrieve a paginated list of students.

    Args:
        db (Session): Database session dependency.

    Returns:
        Page[Student]: Paginated list of students.
    """
    logger.info("Fetching all students from the database.")
    return student_service.get_students(db)

@router.get("/students/{student_id}", response_model=Student)
async def read_student(student_id: UUID, db: Session = Depends(get_db)) -> Student:
    """
    Retrieve a specific student by student ID.

    Args:
        student_id (UUID): The UUID of the student to retrieve.
        db (Session): Database session dependency.

    Raises:
        HTTPException: If the student is not found.

    Returns:
        Student: The student with the specified ID.
    """
    logger.info(f"Fetching student with ID: {student_id}")
    db_student = student_service.get_student(db, student_id)
    if db_student is None:
        logger.warning(f"Student with ID: {student_id} not found.")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=ErrorMessage.STUDENT_NOT_FOUND.value)
    return db_student

@router.post("/students", response_model=Student)
async def create_new_student(student: StudentCreate, db: Session = Depends(get_db)) -> Student:
    """
    Create a new student.

    Args:
        student (StudentCreate): The student data to create.
        db (Session): Database session dependency.

    Returns:
        Student: The newly created student.
    """
    logger.info("Creating a new student.")
    return student_service.create_student(db, student)

@router.put("/students/{student_id}", response_model=Student)
async def update_existing_student(student_id: UUID, student: StudentCreate,
                                  db: Session = Depends(get_db)) -> Student:
    """
    Update an existing student.

    Args:
        student_id (UUID): The UUID of the student to update.
        student (StudentCreate): The new student data.
        db (Session): Database session dependency.

    Raises:
        HTTPException: If the student is not found.

    Returns:
        Student: The updated student.
    """
    logger.info(f"Updating student with ID: {student_id}")
    db_student = student_service.update_student(db, student_id, student)
    if db_student is None:
        logger.warning(f"Student with ID: {student_id} not found.")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=ErrorMessage.STUDENT_NOT_FOUND.value)
    return db_student

@router.delete("/students/{student_id}", response_model=Student)
async def delete_existing_student(student_id: UUID, db: Session = Depends(get_db)) -> Student:
    """
    Delete an existing student.

    Args:
        student_id (UUID): The UUID of the student to delete.
        db (Session): Database session dependency.

    Raises:
        HTTPException: If the student is not found.

    Returns:
        Student: The deleted student.
    """
    logger.info(f"Deleting student with ID: {student_id}")
    db_student = student_service.delete_student(db, student_id)
    if db_student is None:
        logger.warning(f"Student with ID: {student_id} not found.")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=ErrorMessage.STUDENT_NOT_FOUND.value)
    return db_student

add_pagination(router)
