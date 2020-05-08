import React, { useState, useEffect } from "react"
import Main from "./components/Main";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Keys from "./components/keys"
import Background from "./components/background";
export default function App() {
    const myCards = [];
    const URL = Keys("URL")
    const APIkey = Keys("API")
    const ListURL = Keys("LIST")
    const [cards, setCards] = useState(myCards)
    useEffect(() => {
        fetch(URL, {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
        }).then(res => res.json()).then(data => setCards(data));
    }, [])
    function onFormSubmit(data) {
        const postData = JSON.stringify(data)
        fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
            body: postData
        }).then(res => res.json()).then(data2 => setCards(cards.concat(data2)));
    }
    function onCardMove(_id, whereTo) {
        const data = {
            list: whereTo
        }
        const postData = JSON.stringify(data)
        fetch(`` + URL + `/` + _id + ``, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
            body: postData
        })
            .then(res => res.json())
            .then(ey => { changeCard(ey._id, whereTo) })
    }
    function changeCard(_id, whereTo) {
        const nextCards = cards.map(card => {
            if (card._id === _id) {
                card.list = whereTo;
            }
            return card
        })
        setCards(nextCards)
    }
    function onCardDelete(_id) {
        removecard(_id)
        fetch(`` + URL + `` + "/" + _id.toString(), {
            method: "delete",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-apikey': APIkey,
                "cache-control": "no-cache"
            }
        }).then(res => res.json());
        function removecard(_id) {
            const nextCards = cards.filter(card => card._id != _id);
            setCards(nextCards)
        }
    }

    function onNewListFormSubmit(data) {
        const postData = JSON.stringify(data)
        fetch(ListURL, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
            body: postData
        }).then(res => res.json()).then(data2 => console.log(data2));
    }


    return (
        <div className="App" >
            {cards.length === 0 && <Loader />}
            <Nav />
            <Main onCardDelete={onCardDelete} onCardMove={onCardMove} onFormSubmit={onFormSubmit} onNewListFormSubmit={onNewListFormSubmit} cards={cards} />
            <Background></Background>
        </div>
    );
}