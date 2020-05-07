import React from "react";
import Card from "./Card";
import Form from "./Form";
import Panel from 'muicss/lib/react/panel';
export default function List(props) {

    const mapped = props.card.map((cards) => <Card onCardDelete={props.onCardDelete} onCardMove={props.onCardMove} {...cards} color={cards.color} key={cards._id} name={cards.title} />)

    return (
        < Panel >
            <h2>{props.header}</h2>
            {mapped}
            <Form onFormSubmit={props.onFormSubmit} header={props.header}></Form>
        </Panel >
    );
}