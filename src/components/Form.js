import React, { useState } from "react";
import SubButton from "./ForMbutton"
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';
import { GithubPicker } from 'react-color';
import BasicConcepts from "./daypicker"
export default function Form(props) {
    const peopleArr = [];
    const [title, setTitle] = useState("")
    const [color, setColor] = useState("")
    const [people, setPeople] = useState("")
    const [DueDate, setDate] = useState("")
    const [peopleArray, setPeopleArr] = useState(peopleArr)
    function submit(e) {
        e.preventDefault();
        if (e.target.querySelector(".dateis")) {
            setDate(e.target.querySelector(".dateis").textContent)
        }
        const query = {
            title: title,
            list: props.header,
            added: Date.now(),
            color: color,
            assignedTo: peopleArray,
            dueDate: DueDate
        }

        props.onFormSubmit(query)
        setPeople("")
        setTitle("");
        setColor("#0000");
    }
    function titleChanged(e) {
        setTitle(e.target.value)
    }
    function PeopleChangedTitle(e) {
        setPeople(e.target.value)
    }

    function PeopleChanged(e) {
        const value = e.target.previousElementSibling.previousElementSibling.querySelector("input").value
        e.preventDefault();
        setPeopleArr(peopleArray.concat(value + ", "))
        setPeople("")
    }
    function colorChanged(e) {
        setColor(e.hex)
    }
    const labelStyle = {
        paddingTop: "1rem"
    }
    function revealorHide(e) {
        if (e.target.nextElementSibling.classList.contains("displaynone")) {
            e.target.nextElementSibling.classList.remove("displaynone")
        } else {
            e.target.nextElementSibling.classList.add("displaynone")
        }
    }


    const memberPstyle = {
        marginTop: "1rem"
    }
    const labelsty = {
        color: "rgba(0,0,0,.54)",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "15px"
    }
    const labelstyleDue = {
        marginTop: "1rem",
        color: "rgba(0,0,0,.54)",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "15px"
    }
    const optionsbtn = {
        width: "100%"
    }
    return (
        <Panel className="NewCardFormContainer">
            <form className="NewCardForm" onSubmit={submit}>
                <Input label="Title" onChange={titleChanged} name="title" value={title} />
                <SubButton title={title} />
                <div className="flexrow">
                    <Button style={optionsbtn} variant="raised" type="button" onClick={revealorHide} color="primary">More options</Button>
                    <div className="optionsDiv displaynone">
                        <p style={labelstyleDue}>Due date:</p>
                        <BasicConcepts></BasicConcepts>

                        <Input onChange={PeopleChangedTitle} label="People" name="People" value={people} />
                        <p style={labelsty}>Assigned to: {peopleArray}</p>
                        <Button variant="raised" color="primary" onClick={PeopleChanged} type="button">Add person to card</Button>
                        <p style={labelsty}> Add a color label</p>
                        <GithubPicker style={labelStyle} onChange={colorChanged} name="color" value={color} />

                    </div>
                </div>
            </form>
        </Panel>
    )
}