import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {




    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');
    
    
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

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
