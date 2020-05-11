import React from "react";
// import Button from "./button"
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
export default function Card(props) {
    function onDelete() {
        props.onCardDelete(props._id)
    }
    function moveTo(where) {
        props.onCardMove(props._id, where)
    }
    const style = {
        backgroundColor: props.color,
        display: "block",
        width: "5vw",
        height: "1vw",
        borderRadius: "0.2vw"
    }

    const iconstyle = {
        top: 0,
        right: 0,
        padding: "0.5rem",
        position: "absolute"
    }
    function DueDate() {
        if (props.dueDate) {
            return <p>Due Date: {props.dueDate}</p>;
        } else { return <p></p> }
    }

    const mapped3 = props.mapped3.map((mapped3) => <DropdownItem variant="raised" onClick={() => moveTo(mapped3)} key={mapped3 + "MoveBTN"} color="accent">{mapped3}</DropdownItem>)
    return (

        <Panel id={props._id} className="panelInside">
            <h3>{props.name}</h3>
            <FontAwesomeIcon onClick={props.revealEditForm} style={iconstyle} icon={faEdit} />
            <DueDate></DueDate>
            <div style={style}></div>
            <div className="cardButtons">
                <Button variant="raised" color="danger" onClick={onDelete}>Delete</Button>
                <Dropdown color="primary" label="Move to">
                    {mapped3}
                </Dropdown>
            </div>
            <p>{props.assignedTo}</p>
        </Panel>
    )
}