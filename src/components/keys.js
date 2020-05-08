import React from "react";
export default function Keys(what) {
    if (what == "URL") {
        const key = "https://reacttrello-726f.restdb.io/rest/cards";
        return key;
    } else if (what == "LIST") {
        const key = "https://reacttrello-726f.restdb.io/rest/lists"
        return key;
    } else if (what == "API") {
        const key = "5eb0059f4064fd380416522d"
        return key;
    }
}