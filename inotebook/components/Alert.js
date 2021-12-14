import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext'

const Alert = () => {

    const alerts = useContext(alertContext)

    return (
        <>
            <div className="alert alert-primary" role="alert">
                {alerts.alert===null? alerts.alert : alerts.alert.msg}
            </div>
        </>
    )
}

export default Alert
