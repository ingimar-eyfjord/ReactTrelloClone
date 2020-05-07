import React, { useState } from "react";
import SubButton from "./ForMbutton"
import Input from 'muicss/lib/react/input';
export default function Form(props) {
    const [title, setTitle] = useState("")
    const [color, setColor] = useState("")
    function submit(e) {
        e.preventDefault();
        const data = {
            Header: props.header,
            Title: e.target.querySelector("input").value
        }
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
        setColor(e.target.value)
    }
    return (
        <form onSubmit={submit}>
            <Input label="Title" type="text" onChange={titleChanged} name="title" value={title} />
            <label>
                Color
            <input type="color" onChange={colorChanged} name="color" value={color} />
            </label>
            <SubButton title={title} />
        </form>
    )
}