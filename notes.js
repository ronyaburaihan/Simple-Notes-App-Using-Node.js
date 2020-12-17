const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'Your notes .....'
}

const addNote = (title,body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0){
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

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}