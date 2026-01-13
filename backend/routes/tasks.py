from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session
from backend.db import get_session
from backend.auth.dependencies import get_current_user
from backend.models.task import TaskCreate, TaskUpdate, TaskCompleteUpdate
from backend.schemas.task import TaskResponse, TaskListResponse
from backend.services.task import (
    create_task,
    get_tasks_by_user,
    get_task_by_id_and_user,
    update_task,
    delete_task,
    toggle_task_completion
)

router = APIRouter()

@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_new_task(
    task_data: TaskCreate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Validate title length
    if len(task_data.title) > 255:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Title must not exceed 255 characters"
        )

    task = create_task(session, task_data, current_user)
    return task

@router.get("/tasks", response_model=TaskListResponse)
def get_user_tasks(
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    tasks = get_tasks_by_user(session, current_user)
    return TaskListResponse(tasks=tasks)

@router.get("/tasks/{id}", response_model=TaskResponse)
def get_single_task(
    id: str,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = get_task_by_id_and_user(session, id, current_user)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {id} not found or does not belong to user"
        )
    return task

@router.put("/tasks/{id}", response_model=TaskResponse)
def update_existing_task(
    id: str,
    task_data: TaskUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Validate title length if provided
    if task_data.title is not None and len(task_data.title) > 255:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Title must not exceed 255 characters"
        )

    task = update_task(session, id, task_data, current_user)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {id} not found or does not belong to user"
        )
    return task

@router.delete("/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_task(
    id: str,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    success = delete_task(session, id, current_user)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {id} not found or does not belong to user"
        )
    return

@router.patch("/tasks/{id}/complete", response_model=TaskResponse)
def toggle_task_complete(
    id: str,
    task_data: TaskCompleteUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = toggle_task_completion(session, id, task_data, current_user)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {id} not found or does not belong to user"
        )
    return task