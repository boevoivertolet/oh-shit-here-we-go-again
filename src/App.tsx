import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type TodolistType = {
    todolistsId: string
    title: string
    filter: FilterValuesType
}
type StateTaskType = {
    [key: string]: Array<TasksType>
}

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {
    let todolistsId1 = v1()
    let todolistsId2 = v1()


    let [tasks, setTasks] = useState<StateTaskType>({
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
    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {todolistsId: todolistsId1, title: 'what to learn', filter: 'all'},
        {todolistsId: todolistsId2, title: 'what to buy', filter: 'all'}
    ])


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

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        let tasksForChangeStatus = tasks[todolistId]
        let task = tasksForChangeStatus.find(task => task.taskId === taskId)
        if (task) {
            task.isDone = isDone

        }
        setTasks({...tasks})

    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(todolist => todolist.todolistsId !== todolistId)
        setTodolist(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(todolist => todolist.todolistsId === todolistId);
        if (todolist) {
            todolist.title = newTitle
        }
    }

    function addTodolist(newTodolistTitle: string) {
        let todolist: TodolistType = {todolistsId: v1(), title: newTodolistTitle, filter: 'all'}
        setTodolist([todolist, ...todolists])
        setTasks({...tasks, [todolist.todolistsId]: []})
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        let tasksForChangeStatus = tasks[todolistId]
        let task = tasksForChangeStatus.find(task => task.taskId === taskId)
        if (task) {
            task.title = newTitle

        }
        setTasks({...tasks})

    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>


            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.todolistsId];
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
                }

                return <Todolist
                    tasks={tasksForTodolist}
                    key={todolist.todolistsId}
                    title={todolist.title}
                    filter={todolist.filter}
                    todolistsId={todolist.todolistsId}
                    // callbacks
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    );
}


export default App;
