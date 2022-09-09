import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


export type TasksType = {
    taskId: string
    title: string
    isDone: boolean

}


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistsId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
    todolistsId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle:string) => void
}

export function Todolist(props: TodolistPropsType) {

    const filterAll = () => {
        props.changeFilter(props.todolistsId, 'all')
    }
    const filterActive = () => {
        props.changeFilter(props.todolistsId, 'active')
    }
    const filterCompleted = () => {
        props.changeFilter(props.todolistsId, 'completed')
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistsId)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistsId, newTitle)

    }
    const addTask = (newTaskTitle: string) => {
        props.addTask(props.todolistsId, newTaskTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>-</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                            const onClickRemoveTask = () => {
                                props.removeTask(task.taskId, props.todolistsId)
                            }
                            const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.todolistsId, task.taskId, event.currentTarget.checked);

                            }
                            const onChangeTitleHandler = (newTitle: string) => {
                                props.changeTaskTitle(props.todolistsId, task.taskId, newTitle);

                            }
                            return <li className={task.isDone ? 'is-done' : ''} key={task.taskId}><input
                                onChange={checkboxOnChange} type="checkbox"
                                checked={task.isDone}></input>
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
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

