import React, { useState } from "react";
export default function Button() {
    const [click, setClicks] = useState(0);
    function buttonClicked(e) {
        setClicks(click + 1);
    }
    return <button onClick={buttonClicked}>{click}</button>
}