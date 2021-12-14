import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([])

    // ============Fetch all notes ===============
    const fetchNotes = async () => {
        // Api Call 
        const response = await fetch(`${host}/api/notes/allNotes`, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token')
                // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.NjE5M2ZjYjBhYzJkZjliYjMzNmExMDA3.82yy61P0cNcZ5VvWG6hWKDybjaMOrGSANEFZCyUCJTs'
            },
        });

        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }


    //============= Add a new note================
    const addNote = async (title, description, tag) => {
        // Api Call 
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
                // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.NjE5M2ZjYjBhYzJkZjliYjMzNmExMDA3.82yy61P0cNcZ5VvWG6hWKDybjaMOrGSANEFZCyUCJTs'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json()
        // console.log(json)
        setNotes(notes.concat(note))


        // Client Side 
        // const note = {
        //     "_id": "6197b1904e987b44b40aad42",
        //     "user": "6193fcb0ac2df9bb336a1007",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2021-11-19T14:15:44.581Z",
        //     "__v": 0
        // }

        // setNotes(notes.concat(note))
    }

    //============== Update a existing note=============
    const updateNote = async (id, title, description, tag) => {
        // Api Call 
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
                // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.NjE5M2ZjYjBhYzJkZjliYjMzNmExMDA3.82yy61P0cNcZ5VvWG6hWKDybjaMOrGSANEFZCyUCJTs'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        console.log(json)


        let reqNotes = JSON.parse(JSON.stringify(notes))
        // Client Side 
        for (let index = 0; index < reqNotes.length; index++) {
            const element = reqNotes[index];
            if (element._id === id) {
                reqNotes[index].title = title
                reqNotes[index].description = description
                reqNotes[index].tag = tag
                break
            }
        }
        setNotes(reqNotes)
    }


    //==================Delete a note============
    const deleteNote = async (id) => {

        // Api Call 
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem('token')
                // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.NjE5M2ZjYjBhYzJkZjliYjMzNmExMDA3.82yy61P0cNcZ5VvWG6hWKDybjaMOrGSANEFZCyUCJTs'
            }
        });

        const json = await response.json()
        console.log(json)

        // Client Side 
        // console.log(`note with id = ${id} will be deleted`)
        const newNotes = notes.filter(note => {
            return note._id !== id
        })
        setNotes(newNotes)
    }


    return (
        <noteContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;