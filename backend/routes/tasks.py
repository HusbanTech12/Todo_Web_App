<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

from auth.dependencies import get_current_user
from db import get_session
from models.task import Task, TaskCreate, TaskUpdate, TaskStatus, TaskSort
from schemas.task import (
    TaskCreate as TaskCreateSchema,
    TaskUpdate as TaskUpdateSchema,
    TaskResponse,
    TaskListResponse,
    TaskSingleResponse,
    SuccessResponse,
    ErrorResponse
)

router = APIRouter(prefix="/api", tags=["tasks"])

@router.get("/{user_id}/tasks", response_model=TaskListResponse)
def get_tasks(
    user_id: str,
    status_param: Optional[TaskStatus] = Query(None, alias="status"),
    sort: Optional[TaskSort] = Query(None),
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Retrieve all tasks for a specific user with optional filtering and sorting
    """
    # Verify that the requested user_id matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access another user's tasks"
        )

    # Build query
    query = select(Task).where(Task.user_id == user_id)

    # Apply status filter
    if status_param and status_param != TaskStatus.all:
        if status_param == TaskStatus.pending:
            query = query.where(Task.completed == False)
        elif status_param == TaskStatus.completed:
            query = query.where(Task.completed == True)

    # Apply sorting
    if sort:
        if sort == TaskSort.created:
            query = query.order_by(Task.created_at.desc())
        elif sort == TaskSort.title:
            query = query.order_by(Task.title)
        elif sort == TaskSort.due_date:  # We don't have due_date field, so ordering by updated_at
            query = query.order_by(Task.updated_at)

    tasks = session.exec(query).all()

    # Convert to response format
    task_responses = [
        TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
        for task in tasks
    ]

    return TaskListResponse(success=True, data=task_responses)


@router.post("/{user_id}/tasks", response_model=TaskSingleResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: str,
    task_create: TaskCreateSchema,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user
    """
    # Verify that the user_id in the path matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot create task for another user"
        )

    # Validate that title is not empty
    if not task_create.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title is required and cannot be empty"
        )

    # Create new task
    task = Task(
        title=task_create.title,
        description=task_create.description,
        completed=False,
        user_id=user_id
    )

    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskSingleResponse(
        success=True,
        data=TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
    )


@router.get("/{user_id}/tasks/{task_id}", response_model=TaskSingleResponse)
def get_task(
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Retrieve a specific task by ID
    """
    # Verify that the user_id in the path matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access another user's task"
        )

    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )

    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access another user's task"
        )

    return TaskSingleResponse(
        success=True,
        data=TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
    )


@router.put("/{user_id}/tasks/{task_id}", response_model=TaskSingleResponse)
def update_task(
    user_id: str,
    task_id: int,
    task_update: TaskUpdateSchema,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID
    """
    # Verify that the user_id in the path matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot update another user's task"
        )

    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )

    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot update another user's task"
        )

    # Update task fields if provided
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.description is not None:
        task.description = task_update.description
    if task_update.completed is not None:
        task.completed = task_update.completed

    # Update the timestamp
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskSingleResponse(
        success=True,
        data=TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
    )


@router.delete("/{user_id}/tasks/{task_id}", response_model=SuccessResponse)
def delete_task(
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID
    """
    # Verify that the user_id in the path matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot delete another user's task"
        )

    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )

    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot delete another user's task"
        )

    # Delete the task
    session.delete(task)
    session.commit()

    return SuccessResponse(success=True)


@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskSingleResponse)
def toggle_task_completion(
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task
    """
    # Verify that the user_id in the path matches the authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot update another user's task"
        )

    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )

    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot update another user's task"
        )

    # Toggle the completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskSingleResponse(
        success=True,
        data=TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
    )
=======
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session
from db import get_session
from auth.dependencies import get_current_user
from models.task import TaskCreate, TaskUpdate, TaskCompleteUpdate
from schemas.task import TaskResponse, TaskListResponse
from services.task import (
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
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
