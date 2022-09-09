import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {PostAdd} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void


}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }


    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
        } else {
            setError('field is required')
        }
        setNewTaskTitle('');
    }


    return (
        <div>
            <TextField
                label="what to do... ?"
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            {/*<input*/}
            {/*    value={newTaskTitle}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton  onClick={addTask}>
                <PostAdd/>
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
             {/*добавил ерор из mat UI*/}
        </div>
    )
}