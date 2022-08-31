import React from 'react';


export type TasksType = {
    id: string
    title: string
    isDone: boolean

}


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(id: string)=> void
}

export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li><input type="checkbox"
                                                       checked={task.isDone}></input><span>{task.title}</span>
                            <button onClick ={()=>{props.removeTask(task.id)}}>-</button>
                        </li>
                    )
                }

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}