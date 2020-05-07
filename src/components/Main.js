import React from "react";
import List from "./List";
export default function Main({ cards, onFormSubmit, onCardDelete, onCardMove }) {
    console.log(cards)
    return (
        <main>
            <List onCardDelete={onCardDelete} onCardMove={onCardMove} onFormSubmit={onFormSubmit} header="ToDo" card={cards.filter((c) => c.list === "ToDo")} />
            <List onCardDelete={onCardDelete} onCardMove={onCardMove} onFormSubmit={onFormSubmit} header="Doing" card={cards.filter((c) => c.list === "Doing")} />
            <List onCardDelete={onCardDelete} onCardMove={onCardMove} onFormSubmit={onFormSubmit} header="Done" card={cards.filter((c) => c.list === "Done")} />
        </main>
    );
}