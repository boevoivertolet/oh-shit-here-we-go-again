import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {
    let todolists: Array<TodolistType> = [
        {id: v1(), title: 'what to learn', filter: 'active'},
        {id: v1(), title: 'what to buy', filter: 'completed'}
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);

    // let [filter, setFilter] = useState<FilterValuesType>('all');


    function addTask(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    function removeTask(taskId: string) {
        let resultTasks = tasks.filter(task => task.id !== taskId);
        setTasks(resultTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);

    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let taskToChangeStatus = tasks.find(task => task.id === taskId)
        if (taskToChangeStatus) {
            taskToChangeStatus.isDone = isDone
        }
        setTasks([...tasks])


    }




    return (
        <div className="App">

            {todolists.map((todolist) => {
                let tasksForTodolist = tasks;
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone);
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone);
                }
                return <Todolist
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                />
            })}

        </div>
    );
}


export default App;
