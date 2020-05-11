import React, { useState } from "react";
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import BasicConcepts from "./daypicker"
import Input from 'muicss/lib/react/input';
import { GithubPicker } from 'react-color';
export default function EditCard({ revealEditForm, onCardChange }) {
    const changetitlepeopleArr = [];
    const [changetitle, cahngesetTitle] = useState("")
    const [changetitlecolor, cahngesetColor] = useState("")
    const [changetitlepeople, cahngesetPeople] = useState("")
    const [ChangepeopleArray, ChangesetPeopleArr] = useState(changetitlepeopleArr)

    function PeopleChanged(e) {
        const value = e.target.previousElementSibling.previousElementSibling.querySelector("input").value
        ChangesetPeopleArr(ChangepeopleArray.concat(value + ", "))
        cahngesetPeople("")
    }

    function ChangetitleChanged(e) {
        cahngesetTitle(e.target.value)
    }
    function ChangecolorChanged(e) {
        cahngesetColor(e.hex)
    }
    function ChancgePeopleChangedTitle(e) {
        cahngesetPeople(e.target.value)
    }

    const editModalstyle = {
        position: "absolute",
        maxWidth: "unset",
        width: "10vw",
        height: "fit-content"
    }
    const editformstyle = {
        maxWidth: "unset",
        width: "10vw",
        height: "fit-content",
        display: "flex",
        flexDirection: "column"
    }

    function submitcahnges(e) {
        e.preventDefault();
        cahngesetPeople("")
        cahngesetColor("")
        cahngesetTitle("")
        ChangesetPeopleArr([])
        let dateis = undefined
        if (e.target.querySelector(".dateis")) {
            dateis = e.target.querySelector(".dateis").textContent
            e.target.querySelector(".dateis").textContent = ""
        }

        const list = e.target.dataset.listBelongs
        const query = {
            title: changetitle,
            list: list,
            added: Date.now(),
            color: changetitlecolor,
            assignedTo: ChangepeopleArray,
            dueDate: dateis
        }

        const buildAnObjectFromAQuery = query => ({
            ...query.title && { title: query.title },
            ...query.list && { list: query.list },
            ...query.added && { added: query.added },
            ...query.color && { color: query.color },
            ...query.assignedTo.length > 0 && { assignedTo: query.assignedTo },
            ...query.dueDate && { dueDate: query.dueDate },
        });
        const data = buildAnObjectFromAQuery(query)
        e.target.parentElement.classList.add("displaynone")
        onCardChange(data, e.target.parentElement.dataset.id)
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
    return (
        <Panel style={editModalstyle} className="editcard displaynone">
            <form onSubmit={submitcahnges} style={editformstyle} className="editForm">
                <Input label="Title" onChange={ChangetitleChanged} name="Changetitle" value={changetitle} />
                <p style={labelsty}> Add a color label</p>
                <GithubPicker onChange={ChangecolorChanged} name="Changecolor" value={changetitlecolor} />
                <Input style={memberPstyle} onChange={ChancgePeopleChangedTitle} label="Add a Member" name="ChangePeople" value={changetitlepeople} />
                <p style={labelsty}>Assigned to: {ChangepeopleArray}</p>
                <Button variant="raised" color="primary" onClick={PeopleChanged} type="button">Add member to card</Button>
                <p style={labelstyleDue}>Due date:</p>
                <BasicConcepts />
                <Button variant="raised" color="primary">Submit Changes</Button>
                <Button className="alignSelf" onClick={revealEditForm} variant="raised" color="danger" type="reset">Cancel</Button>
            </form>
        </Panel>
    )
}