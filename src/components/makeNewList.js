import React, { useState } from "react";
import SubButton from "./ForMbutton"
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';
export default function MakeNewList(props) {
    const [title2, setTitle2] = useState("")

    function submitNewList(e) {
        e.preventDefault();
        setTitle2("");
        props.onNewListFormSubmit({
            Title: title2,
        })
    }
    function NewTitleChanged(e) {
        setTitle2(e.target.value)
    }
    const styleForPanel = {
        height: "fit-content"
    }
    return (
        <Panel style={styleForPanel}>
            <form onSubmit={submitNewList}>
                <Input label="Make New List" onChange={NewTitleChanged} name="title" value={title2} />
                <div className="flexRow">
                    <SubButton title={title2} />
                </div>
            </form>
        </Panel>
    );
}