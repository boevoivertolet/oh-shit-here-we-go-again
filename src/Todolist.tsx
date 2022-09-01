import React, {ChangeEvent, useState} from 'react';
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
        setNewTaskTitle(event.currentTarget.value)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler}/>
                <button onClick={() => props.addTask(newTaskTitle)}>+</button>
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