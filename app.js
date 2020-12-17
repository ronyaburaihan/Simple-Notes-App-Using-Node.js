const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')

//customize yargs version
yargs.version('1.1.0')

//to create 'add' command
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//to create 'remove' command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//to crete 'list' command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(){
        console.log('Showing all notes')
    }
})

//to crete 'read' command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(){
        console.log('Reading a note')
    }
})


yargs.parse()

//console.log(yargs.argv)


