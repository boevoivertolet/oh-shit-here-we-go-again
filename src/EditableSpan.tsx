import React, {ChangeEvent, useState} from 'react';

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
        ? <input value={newTitle} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>

}