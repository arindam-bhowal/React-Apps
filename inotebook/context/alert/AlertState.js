import { useState } from "react";
import alertContext from "./alertContext";


const AlertState = (props) => {
    const [alert, setalert] = useState(null)

    const showAlert = (type, message) => {
        setalert({
            type: type,
            msg: message
        })
        setTimeout(() => {
            setalert(null)
        }, 1500);
    }

    return (
        <alertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </alertContext.Provider>
    )
}
export default AlertState;
