const fs = require('fs')

const getNotes = function(){
    return 'Your notes .....'
}

const addNote = function(title,body){
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if(duplicateNotes.length === 0){

        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)

        console.log('Note added successfully')
    } else {
        console.log('Note title already exists')
    }
}

const saveNotes = function(notes){
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}

const loadNotes = function(){
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    } catch (e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}