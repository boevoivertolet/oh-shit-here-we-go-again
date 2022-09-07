import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    taskId: string
    title: string
    isDone: boolean

}


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistsId: string,value: FilterValuesType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string ,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistsId: string
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(props.todolistsId,newTaskTitle.trim());
        } else {
            setError('field is required')
        }
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(props.todolistsId,newTaskTitle);
            setNewTaskTitle('');
        }


    }

    const filterAll = () => {
        props.changeFilter(props.todolistsId,'all')
    }
    const filterActive = () => {
        props.changeFilter(props.todolistsId,'active')
    }
    const filterCompleted = () => {
        props.changeFilter(props.todolistsId,'completed')
    }

    const removeTodolist = () => {
      props.removeTodolist(props.todolistsId)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>-</button></h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const onClickRemoveTask = () => {
                                props.removeTask(task.taskId, props.todolistsId)
                            }
                            const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.todolistsId, task.taskId, event.currentTarget.checked);

                            }
                            return <li key={task.taskId}><input onChange={checkboxOnChange} type="checkbox"
                                                            checked={task.isDone}></input><span
                                className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <button onClick={onClickRemoveTask}>-
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={filterAll}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={filterActive}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={filterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}