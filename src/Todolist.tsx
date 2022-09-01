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
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }


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
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li key={task.id}><input type="checkbox"
                                                                     checked={task.isDone}></input><span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>-
                            </button>
                        </li>
                    )
                }

            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}