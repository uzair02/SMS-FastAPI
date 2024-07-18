from enum import Enum

class ErrorMessage(str, Enum):
    """
    Enum for storing error messages used in the application.

    Attributes:
        STUDENT_NOT_FOUND (str): Message indicating that a student was not found.
    """
    STUDENT_NOT_FOUND = "Student Not Found!"
