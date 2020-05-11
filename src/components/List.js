import React from "react";
import Card from "./Card";
import Form from "./Form";
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
export default function List(props) {
    const mapped = props.card.map((cards) => <Card onCardDelete={props.onCardDelete} revealEditForm={props.revealEditForm} onCardMove={props.onCardMove} {...cards} mapped3={props.mapped3} assignedTo={cards.assignedTo} color={cards.color} key={cards._id} dueDate={cards.dueDate} name={cards.title} />)
    const dltStyle = {
        marginTop: "1rem",
        bottom: 0

    }
    function onListDelete5(e) {
        const cardsID = e.target.parentElement.querySelectorAll(".panelInside")
        if (cardsID.length > 0) {
            if (window.confirm("This will delete all the cards as well, are you sure?")) {
                props.onListDelete(e.target.id)
                let IDs = []
                cardsID.forEach(e => {
                    IDs.push(e.id)
                })
                props.deleteAllCardsInLists(IDs)
            }
        } else {
            props.onListDelete(e.target.id)
        }
    }
    return (
        < Panel >
            <h2>{props.header}</h2>
            {mapped}
            <Form onFormSubmit={props.onFormSubmit} header={props.header}></Form>
            <Button style={dltStyle} id={props.whatID} onClick={onListDelete5} variant="raised" color="danger"> {(props.card.length > 0) ? "Delete List And Content" : "Delete List"}</Button>
        </Panel >
    );
}