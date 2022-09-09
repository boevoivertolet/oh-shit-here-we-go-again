import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setNewTitle] = useState('');

    const activateEditeMode = () => {
        setEditMode(true);
        setNewTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(newTitle);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return editMode
        ? <TextField value={newTitle} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>

}