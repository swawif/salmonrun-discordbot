const Note = require('../models/note.model.js');
const Discord = require("discord.js");
const client = new Discord.Client();

//Create and Save a new Note
exports.luigi = client.message

//Find all notes
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
        console.log("All Notes displayed");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while retrieving notes"
        });
    console.log("error while retrieving all notes");
    });
};

//Fine one note using noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with ID " + req.params.noteId
            });    
        }
        console.log("edit request validated on id "+ req.params.noteId);
        res.send(note);
        console.log("found note with id "+ req.params.noteId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    
    });
};

//Update one note using noteId
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    console.log("Request Validated");
    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
        console.log("note updated on id "+ req.params.noteId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

//Delete note by noteId
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        console.log("Found note with id "+ req.params.noteId);
        res.send({message: "Note deleted successfully!"});
        console.log("deleted note with id "+ req.params.noteId);
        
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};