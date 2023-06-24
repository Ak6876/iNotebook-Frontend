import React, { useState } from "react";
import Notecontext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitials = []
    const [notes,setNotes] = useState(notesInitials)

    //Get all Notes
    const getNotes = async()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = await response.json()
          setNotes(json)
        //Concat returns an array whereas push updates an array
        // setNotes(notes.push(note))
        // setNotes(notes.concat(note))
    }
    //Add a Note
    const addNote = async(title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const note = await response.json()
          setNotes(notes.concat(note))
          
          //Concat returns an array whereas push updates an array
          // setNotes(notes.push(note))
          // setNotes(notes.concat(note))
    }
    //Delete a Note
    const deleteNote = async(id)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = response.json()
          console.log(json)
        const newNotes = notes.filter((notes)=>{return notes._id !==id})
        setNotes(newNotes)
    }

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Edit a Note
    const editNote = async(id,title,description,tag)=>{
        //API Call

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: "PUT", 
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}), 
            });
            const json = await response.json(); 
            console.log(json)
          
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if(element._id === id){
                newNotes[index].title=title
                newNotes[index].description=description
                newNotes[index].tag=tag
                break;       
            }
        }
        setNotes(newNotes)
    }
return (
    <Notecontext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </Notecontext.Provider>
)
}
export default NoteState