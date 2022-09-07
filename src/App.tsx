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
    let todolistsId1 = v1()
    let todolistsId2 = v1()


    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {todolistsId: todolistsId1, title: 'what to learn', filter: 'active'},
        {todolistsId: todolistsId2, title: 'what to buy', filter: 'completed'}
    ])


    let [tasks, setTasks] = useState({
        [todolistsId1]: [
            {taskId: v1(), title: 'CSS&HTML', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'React', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false}
        ],
        [todolistsId2]: [
            {taskId: v1(), title: 'book', isDone: true},
            {taskId: v1(), title: 'milk', isDone: true},
            {taskId: v1(), title: 'beer', isDone: false},
            {taskId: v1(), title: 'juice', isDone: false}
        ]

    })

    // let [tasks, setTasks] = useState<Array<TasksType>>([
    //     {taskId: v1(), title: 'CSS&HTML', isDone: true},
    //     {taskId: v1(), title: 'JS', isDone: true},
    //     {taskId: v1(), title: 'React', isDone: false},
    //     {taskId: v1(), title: 'Redux', isDone: false}
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>('all');


    function addTask(todolistId: string, newTaskTitle: string) {
        let task = {taskId: v1(), title: newTaskTitle, isDone: false};
        let tasksObj = tasks[todolistId]
        let newTasks = [task, ...tasksObj]
        tasks[todolistId] = newTasks
        setTasks({...tasks});
    }

    function removeTask(taskId: string, todolistId: string) {
        let taskforRemove = tasks[todolistId];
        let resultTasks = taskforRemove.filter(task => task.taskId !== taskId);
        tasks[todolistId] = resultTasks
        setTasks({...tasks});
    }

    function changeFilter(todolistsId: string, value: FilterValuesType) {
        let todolistFilter = todolists.find(todolist => todolist.todolistsId === todolistsId)
        if (todolistFilter) {
            todolistFilter.filter = value
            setTodolist([...todolists])
        }


    }

    function changeTaskStatus(todolistId: string ,taskId: string, isDone: boolean) {
        let tasksForChangeStatus = tasks[todolistId]
        let task = tasksForChangeStatus.find(task => task.taskId === taskId)
        if (task) {
            task.isDone = isDone

        }
        setTasks({...tasks})


    }


    return (
        <div className="App">

            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.todolistsId];
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
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
