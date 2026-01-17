from sqlmodel import Session, select, update
from typing import List, Optional
from models.task import Task, TaskCreate, TaskUpdate, TaskCompleteUpdate
from exceptions import TaskNotFoundException, TaskNotOwnedException
from datetime import datetime

def create_task(session: Session, task_data: TaskCreate, user_id: str) -> Task:
    task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed,
        user_id=user_id
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_tasks_by_user(session: Session, user_id: str) -> List[Task]:
    statement = select(Task).where(Task.user_id == user_id)
    results = session.exec(statement)
    return results.all()

def get_task_by_id_and_user(session: Session, task_id: str, user_id: str) -> Optional[Task]:
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    result = session.exec(statement)
    return result.first()

def update_task(session: Session, task_id: str, task_data: TaskUpdate, user_id: str) -> Optional[Task]:
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    result = session.exec(statement)
    task = result.first()

    if not task:
        return None

    # Update only provided fields
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.completed is not None:
        task.completed = task_data.completed

    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def delete_task(session: Session, task_id: str, user_id: str) -> bool:
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    result = session.exec(statement)
    task = result.first()

    if not task:
        return False

    session.delete(task)
    session.commit()
    return True

def toggle_task_completion(session: Session, task_id: str, task_data: TaskCompleteUpdate, user_id: str) -> Optional[Task]:
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    result = session.exec(statement)
    task = result.first()

    if not task:
        return None

    task.completed = task_data.completed
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task