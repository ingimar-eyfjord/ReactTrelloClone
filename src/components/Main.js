import React from "react";
import List from "./List";
import MakeNewList from "./makeNewList"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
export default function Main({ cards, onFormSubmit, onCardDelete, onCardMove, onNewListFormSubmit, Lists, onListDelete, deleteAllCardsInLists, revealEditForm }) {
    let mapped3 = []
    function push() {
        Lists.map((Lists) => mapped3.push(Lists.Title))
    }
    push()
    const mapped2 = Lists.map((Lists) => <SimpleBar key={Lists._id} style={{ maxHeight: "95vh", width: "fit-content" }}><List revealEditForm={revealEditForm} onCardDelete={onCardDelete} deleteAllCardsInLists={deleteAllCardsInLists} onListDelete={onListDelete} whatID={Lists._id} onCardMove={onCardMove} onFormSubmit={onFormSubmit} mapped3={mapped3} List={Lists} header={Lists.Title} key={Lists._id} card={cards.filter((c) => c.list === Lists.Title)} /></SimpleBar >)

    return (
        <main>
            {mapped2}
            <MakeNewList onNewListFormSubmit={onNewListFormSubmit}></MakeNewList>
        </main>
    );
}