from pydantic import BaseModel

class TextMessage(BaseModel):
    message: str

class TasksList(BaseModel):
    tasksList: dict[str, str]

class Task(BaseModel):
    task: str
