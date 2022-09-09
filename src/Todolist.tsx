import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
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
                {/*<button onClick={removeTodolist}></button>*/}
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/> {/*заменил кнопку на иконку*/}
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                            return <div className={task.isDone ? 'is-done' : ''} key={task.taskId}><Checkbox
                                color={'default'}
                                onChange={checkboxOnChange}
                                checked={task.isDone}></Checkbox>
                                {/*заменил инпут*/}
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                {/*<button onClick={onClickRemoveTask}>-*/}
                                {/*</button>*/}
                                <IconButton aria-label="delete" onClick={onClickRemoveTask}>
                                    <Delete/> {/*заменил кнопку на иконку*/}
                                </IconButton>
                            </div>
                        }
                    )
                }
            </div>
            <div>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'} onClick={filterAll}>All
                </Button>
                <Button color={'inherit'} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={filterActive}>Active
                </Button>
                <Button color={'inherit'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={filterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}

