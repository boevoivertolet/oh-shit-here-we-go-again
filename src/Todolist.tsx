import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean

}


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
        }
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }


    }

    const filterAll = () => {
        props.changeFilter('all')
    }
    const filterActive = () => {
        props.changeFilter('active')
    }
    const filterCompleted = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const onClickRemoveTask = () => {
                                props.removeTask(task.id)
                            }
                            const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, event.currentTarget.checked);

                            }
                            return <li key={task.id}><input onChange={checkboxOnChange} type="checkbox"
                                                            checked={task.isDone}></input><span>{task.title}</span>
                                <button onClick={onClickRemoveTask}>-
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={filterAll}>All
                </button>
                <button onClick={filterActive}>Active
                </button>
                <button onClick={filterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}