const chalk = require('chalk')
const fs = require('fs')

const addNote = (title,body) => {
    const notes = loadNotes()

    const isNoteDuplicate = notes.find( (note) => note.title === title)

    if(!isNoteDuplicate){
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green('Note added successfully'))
    } else {
        console.log(chalk.red('Note title already exists'))
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}

const loadNotes = () => {
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    } catch (e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length){
        console.log(chalk.green('Note successfully removed'))
    } else {
        console.log(chalk.red('Notes not found'))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.green.inverse('Your notes'))

    notes.forEach( (note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.white.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}