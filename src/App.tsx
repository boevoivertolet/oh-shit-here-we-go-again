import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    function removeTask(id: string) {
        let resultTasks = tasks.filter(task => task.id !== id)
        setTasks(resultTasks)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


export default App;
