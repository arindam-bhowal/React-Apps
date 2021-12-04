const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const authenticateUser = require('../middlewares/fetchUser')
const { body, validationResult } = require('express-validator');


// Route 1: Get all Notes. Get request. Login required  Get /api/notes/allNotes
router.get('/allNotes', authenticateUser, async (req, res) => {

    try {
        const allNotes = await Notes.find({ user: req.user })
        // console.log(req.user, req.user.id)
        res.json(allNotes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error!!')
    }
})




// Route 2: Post Request . Add new notes. Login required. POST api/notes/addNotes
router.post('/addNotes', authenticateUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { title, description, tag } = req.body
            const note = await new Notes({
                user: req.user,
                title: title,
                description: description,
                tag: tag
            })

            const newNote = await note.save()
            res.send(newNote)


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error!!')
        }
    })




// Route 3: Put Request . Update an existing Note . Login required. PULL /api/notes/updateNote
router.put('/updateNote/:id', authenticateUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {

            const updateNote = {}
            const { title, description, tag } = req.body
            if (title) { updateNote.title = title }
            if (description) { updateNote.description = description }
            if (tag) { updateNote.tag = tag }
            // if (title || description || tag) { updateNote.date = Date.now }

            const note = await Notes.findById(req.params.id)
            if (!note) {
                res.status(404).send('Note not Found!! Error please check again.')
            }
            if (note.user.toString() !== req.user) {
                // console.log(req.user, note.user, note.user.toString())
                res.status(401).send('Not Allowed to change anything here')
            }


            // Usually when you perform update operations in mongoose, it returns the previous state of the document (before it was updated) and not the updated one. By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour
            const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true })

            res.json(updateNote)


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error!!')
        }
    })




// Route 4: Put Request . Deleting a note . Login required. DELETE /api/notes/deleteNote
router.delete('/deleteNote/:id', authenticateUser, async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {

        const reqNote = await Notes.findById(req.params.id)
        if (!reqNote) {
            res.status(404).send('Note not Found!! Error please check again.')
        }
        if (reqNote.user.toString() !== req.user) {
            res.status(401).send('Not Allowed to change anything here')
        }

        const deleteNote = await Notes.findByIdAndDelete(req.params.id)

        res.json({
            'message': 'Your note was successfully deleted',
            'note': reqNote
        })


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error!!')
    }
})



module.exports = router