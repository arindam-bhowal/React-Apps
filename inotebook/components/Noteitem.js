import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function Noteitem(props) {
    const { note, editNote } = props

    const context = useContext(noteContext)
    const { deleteNote } = context;

    return (
        <>
            <div className="card col-md-3" style={{ margin: 10 }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-link">{note.date}</h6>
                    <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{editNote(note)}}></i>
                </div>
            </div>
        </>
    )
}

export default Noteitem
