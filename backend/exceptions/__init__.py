class TaskNotFoundException(Exception):
    def __init__(self, task_id: str):
        self.task_id = task_id
        super().__init__(f"Task with id {task_id} not found")

class TaskNotOwnedException(Exception):
    def __init__(self, task_id: str, user_id: str):
        self.task_id = task_id
        self.user_id = user_id
        super().__init__(f"Task with id {task_id} does not belong to user {user_id}")