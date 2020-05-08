import React, { useState } from "react";
import SubButton from "./ForMbutton"
import Input from 'muicss/lib/react/input';
import { GithubPicker } from 'react-color';
export default function Form(props) {
    const [title, setTitle] = useState("")
    const [color, setColor] = useState("")
    function submit(e) {
        e.preventDefault();

        props.onFormSubmit({
            title: title,
            list: props.header,
            added: Date.now(),
            color: color,
            assignedTo: ["Indre", "davi"],
        })
        setTitle("");
        setColor("#0000");
    }
    function titleChanged(e) {
        setTitle(e.target.value)
    }
    function colorChanged(e) {
        console.log(e)
        setColor(e.hex)
    }
    return (
        <form onSubmit={submit}>
            <Input label="Title" onChange={titleChanged} name="title" value={title} />
            <div className="flexRow">
                <GithubPicker onChange={colorChanged} name="color" value={color} />
                <SubButton title={title} />
            </div>
        </form>
    )
}