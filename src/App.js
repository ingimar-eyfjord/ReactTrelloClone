import React, { useState, useEffect } from "react"
import Main from "./components/Main";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Keys from "./components/keys"
import Background from "./components/background";
import EditCard from "./components/EditCard"
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
        }).then(res => res.json()).then(data2 => setLists(Lists.concat(data2)));
    }
    let myLists = []
    const [Lists, setLists] = useState(myLists)

    useEffect(() => {
        fetch(ListURL, {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
        }).then(res => res.json()).then(data => setLists(data));
    }, [])

    function onListDelete(_id) {
        removeList(_id)
        fetch(`` + ListURL + `` + "/" + _id.toString(), {
            method: "delete",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-apikey': APIkey,
                "cache-control": "no-cache"
            }
        }).then(res => res.json());
        function removeList(_id) {
            const NextLists = Lists.filter(list => list._id != _id);
            setLists(NextLists)
        }
    }
    function deleteAllCardsInLists(IDs) {
        const postData = JSON.stringify(IDs);
        // Put in URL endpoint
        fetch(URL + "/*", {
            method: "delete",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-apikey': APIkey,
                "cache-control": "no-cache"
            },
            //The body needs hold the arrays of the ID
            body: postData
        }).then(res => res.json())
            .then(data => {
            })
    }

    function revealEditForm(e) {
        const editModal = document.querySelector(".editcard")
        const tag = e.target.parentElement.tagName;
        const place = e.target.parentElement
        let id = undefined
        let listtile = undefined
        let belongsto = undefined
        if (tag == "svg") {
            id = place.parentElement.id;
            listtile = place.parentElement.querySelector("h3").textContent;
            belongsto = place.parentElement.parentElement.querySelector("h2").textContent;
        } else if (tag == "DIV") {
            id = place.id
            listtile = place.querySelector("h3").textContent;
            belongsto = place.parentElement.querySelector("h2").textContent;
        }
        editModal.dataset.id = id;
        if (!editModal.classList.contains("displaynone")) {
            editModal.classList.add("displaynone")

        } else {
            editModal.dataset.listBelongs = belongsto
            const x = e.clientX;
            const y = e.clientY;
            editModal.style.top = y + 20 + "px";
            editModal.style.left = x - 20 + "px";
            editModal.classList.remove("displaynone")
        }
    }


    function onCardChange(data, id) {
        const postData = JSON.stringify(data)
        fetch(`` + URL + `/` + id + ``, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIkey,
                "cache-control": "no-cache"
            },
            body: postData
        })
            .then(res => res.json())
            .then(cardis => { changeCard2(cardis) })
    }

    function changeCard2(cardis) {
        const nextCards = cards.map(card => {
            if (card._id === cardis._id) {
                card = cardis
            }
            return card
        })
        setCards(nextCards)
    }


    return (
        <div className="App" >
            {cards.length === 0 && <Loader />}
            <Nav />
            <Main onCardDelete={onCardDelete} revealEditForm={revealEditForm} onListDelete={onListDelete} deleteAllCardsInLists={deleteAllCardsInLists} onCardMove={onCardMove} onFormSubmit={onFormSubmit} onNewListFormSubmit={onNewListFormSubmit} Lists={Lists} cards={cards} />
            <EditCard onCardChange={onCardChange} revealEditForm={revealEditForm} ></EditCard>
            <Background></Background>
        </div>
    );
}