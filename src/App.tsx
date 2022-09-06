import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    todolistsId: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {
    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {todolistsId: v1(), title: 'what to learn', filter: 'active'},
        {todolistsId: v1(), title: 'what to buy', filter: 'completed'}
    ])

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {taskId: v1(), title: 'CSS&HTML', isDone: true},
        {taskId: v1(), title: 'JS', isDone: true},
        {taskId: v1(), title: 'React', isDone: false},
        {taskId: v1(), title: 'Redux', isDone: false}
    ]);

    // let [filter, setFilter] = useState<FilterValuesType>('all');


    function addTask(newTaskTitle: string) {
        let newTask = {taskId: v1(), title: newTaskTitle, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    function removeTask(taskId: string) {
        let resultTasks = tasks.filter(task => task.taskId !== taskId);
        setTasks(resultTasks);
    }

    function changeFilter(todolistsId: string, value: FilterValuesType) {
        let todolistFilter = todolists.find(todolist => todolist.todolistsId === todolistsId)
        if (todolistFilter) {
            todolistFilter.filter = value
            setTodolist([...todolists])
        }


    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let taskToChangeStatus = tasks.find(task => task.taskId === taskId)
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
                    key={todolist.todolistsId}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                    todolistsId={todolist.todolistsId}
                />
            })}

        </div>
    );
}


export default App;
