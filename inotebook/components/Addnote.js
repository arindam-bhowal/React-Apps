import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function Addnote() {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const inputContainers = document.querySelectorAll('.form-group input')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        
        inputContainers.forEach(input => {
            input.value = ""
        })
    }

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1 className="my-3 mb-3">Add a Note</h1>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={handleChange} className="form-control" id="title" aria-describedby="emailHelp" minLength="5" required/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={handleChange} className="form-control" id="description" aria-describedby="emailHelp" minLength="5" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" name="tag" onChange={handleChange} className="form-control" id="tag" required/>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary my-3">Submit</button>
            </form>
        </>
    )
}

export default Addnote
