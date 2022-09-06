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
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
        } else {
            setError('field is required')
        }
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
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