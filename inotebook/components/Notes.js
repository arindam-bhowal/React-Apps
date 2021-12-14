import React, { useContext, useEffect, useRef, useState } from 'react'
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext'
import { useHistory } from 'react-router-dom';

const Notes = () => {
    const history = useHistory()

    const context = useContext(noteContext)
    const { notes, fetchNotes, updateNote } = context;

    const ref = useRef(null)
    const closeRef = useRef(null)

    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes()
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const [note, setnote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" })

    const editNote = (currentNote) => {
        ref.current.click()

        setnote({ id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag })
        // setnote(currentNote)
    }


    const handleUpdate = (e) => {
        // e.preventDefault()
        console.log('Updating note...', note)
        updateNote(note.id, note.eTitle, note.eDescription, note.eTag)
        closeRef.current.click();
    }

    const handleChange = (e) => {
        // setnote({ eTitle: e.target.value, eDescription: e.target.value, eTag: e.target.value })
        setnote({ ...note, [e.target.name]: e.target.value })
        // console.log(note)
    }


    return (
        <>
            <Addnote />

            {/* 
                Modal
             */}

            <button ref={ref} type="button" className="btn btn-primary d-none   " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input value={note.eTitle} type="text" name="eTitle" onChange={handleChange} className="form-control" id="eTitle" aria-describedby="emailHelp" minLength="5" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <input value={note.eDescription} type="text" name="eDescription" onChange={handleChange} className="form-control" id="eDescription" aria-describedby="emailHelp" minLength="5" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input value={note.eTag} type="text" name="eTag" onChange={handleChange} className="form-control" id="eTag" required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 style={{ 'color': 'red', 'fontStyle': 'italic' }} className="my-3 mb-3 text-center">Your Notes</h1>

            <div className="my-3 row d-flex justify-content-center">
                {notes.length === 0 && 'Add note to display here'}
                {
                    notes.map(note => {
                        return <Noteitem key={note._id} editNote={editNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
