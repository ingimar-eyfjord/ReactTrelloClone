import React from "react";
import Button from 'muicss/lib/react/button';
export default function SubButton(props) {
    return <Button variant="raised" color="primary" disabled={props.title.length === 0} type="submit" value="save">Submit</Button>
}