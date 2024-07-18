"""
Student Service Module

This module provides service functions for student-related operations, 
including retrieving, creating, updating, and deleting student records 
from the database. The functions utilize SQLAlchemy ORM for database 
interaction and support pagination for listing students.

"""

from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from models.student_model import Student as StudentModel
from schemas.student_schema import StudentCreate
from utils.logging_config  import logger

def get_students(db: Session) -> Page[StudentModel]:
    """
    Retrieve a paginated list of students from the database.

    Args:
        db (Session): SQLAlchemy database session.

    Returns:
        Page[StudentModel]: Paginated list of student records.
    """
    logger.info("Retrieving students from the database.")
    query = db.query(StudentModel)
    return paginate(query)

def get_student(db: Session, student_id: UUID) -> Optional[StudentModel]:
    """
    Retrieve a specific student from the database by student ID.

    Args:
        db (Session): SQLAlchemy database session.
        student_id (UUID): Unique identifier of the student.

    Returns:
        StudentModel: Student record matching the provided student ID, or None if not found.
    """
    logger.info(f"Retrieving student with ID: {student_id}.")
    return db.query(StudentModel).filter(StudentModel.student_id == student_id).first()

def create_student(db: Session, student: StudentCreate) -> StudentModel:
    """
    Create a new student record in the database.

    Args:
        db (Session): SQLAlchemy database session.
        student (StudentCreate): Data representing the new student to be created.

    Returns:
        StudentModel: Created student record from the database.
    """
    update_data = student.dict()
    db_student = StudentModel()

    for key, value in update_data.items():
        setattr(db_student, key, value)

    try:
        db.add(db_student)
        db.commit()
        db.refresh(db_student)
        logger.info(f"Student created with ID: {db_student.student_id}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating student: {e}")
        raise e

    return db_student

def update_student(db: Session, student_id: UUID, student: StudentCreate) -> Optional[StudentModel]:
    """
    Update an existing student record in the database.

    Args:
        db (Session): SQLAlchemy database session.
        student_id (UUID): Unique identifier of the student to be updated.
        student (StudentCreate): Updated data for the student.

    Returns:
        StudentModel: Updated student record from the database, or None if student not found.
    """
    logger.info(f"Updating student with ID: {student_id}")
    db_student = db.query(StudentModel).filter(StudentModel.student_id == student_id).first()
    if db_student:
        try:
            update_data = student.dict()
            for key, value in update_data.items():
                setattr(db_student, key, value)
            db.commit()
            db.refresh(db_student)
            logger.info(f"Student updated with ID: {student_id}")
        except Exception as e:
            db.rollback()
            logger.error(f"Error updating student with ID: {student_id}, Error: {e}")
            raise e
    else:
        logger.warning(f"Student with ID: {student_id} not found.")
    return db_student

def delete_student(db: Session, student_id: UUID) -> Optional[StudentModel]:
    """
    Delete a student record from the database.

    Args:
        db (Session): SQLAlchemy database session.
        student_id (UUID): Unique identifier of the student to be deleted.

    Returns:
        StudentModel: Deleted student record from the database, or None if student not found.
    """
    logger.info(f"Deleteing student with ID: {student_id}")
    db_student = db.query(StudentModel).filter(StudentModel.student_id == student_id).first()
    if db_student:
        try:
            db.delete(db_student)
            db.commit()
            logger.info(f"Student deleted with ID: {student_id}")
        except Exception as e:
            db.rollback()
            logger.error(f"Error deleting student with ID: {student_id}, Error: {e}")
            raise e
    else:
        logger.warning(f"Student with ID: {student_id} not found.")
    return db_student
