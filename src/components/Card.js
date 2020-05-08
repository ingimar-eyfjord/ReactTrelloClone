import React from "react";
// import Button from "./button"
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
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
    return (
        <Panel className="panelInside">
            <h3>{props.name}</h3>
            <div style={style}></div>
            <Button variant="raised" color="danger" onClick={onDelete}>Delete</Button>
            <Button variant="raised" color="accent" onClick={() => moveTo("ToDo")}>Move to ToDo</Button>
            <Button variant="raised" color="accent" onClick={() => moveTo("Doing")}>Move to Doing</Button>
            <Button variant="raised" color="accent" onClick={() => moveTo("Done")}>Move to Done</Button>
        </Panel>
    )
}