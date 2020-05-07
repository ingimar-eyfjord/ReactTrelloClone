import React from "react";
export default function Nav() {
    const navigation = [<a key="1" href="#">Home</a>, <a key="2" href="#">Contact Us</a>];

    return (

        <nav>Nav
            <ul>{navigation}</ul>
        </nav>

    );
}