import axios from 'axios';
import Joi from 'joi';
import React, { useContext, useEffect, useState } from 'react'
import { usrToken } from '../ContextContent/ContextContent';
import $ from 'jquery';
import './Home.css'
export default function Home() {
    const { userId, token, setUserId } = useContext(usrToken);
    const [notesData, setNotesData] = useState([])
    const [err, setErr] = useState([])
    const [note, setNote] = useState({
        title: "",
        desc: ""
    })
const [recive, setrecive] = useState(true)
    const [editedNoteID, setEditedNoteID] = useState("")
    const [deleteNoteID, setDeleteNoteID] = useState("")
    // getNotes()
    const [noNotes, setNoNotes] = useState("")
    useEffect(() => {
        //   alert('hhhhhhhhhh')
        getNotes()
    }, [])

    async function submitUpdateForm(id) {
        console.log(id)
        let nottee = notesData.filter((note) => { return note._id === id })
        console.log(nottee)
        let { title, desc } = nottee[0]
        console.log(nottee[0], title, desc)
        setRecive(false)
        let res = await axios.put('https://route-egypt-api.herokuapp.com/updateNote', { "title": title, "desc": desc, "NoteID": id, "token": token, "userID": userId })
        setRecive(true)
        console.log(res)
        $("#exampleModal3").removeClass('fade');
        $("#exampleModal3").removeClass('show');
        $("#exampleModal3").attr('aria-hidden', "true");
        $("#exampleModal3").removeAttr('role');
        $("#exampleModal3").removeAttr('aria-modal');
        //$('body').removeAttr('style')
        $('body').removeClass('modal-open')
        $("#exampleModal3").remove();
        // $('#exampleModal3').modal('hide');

        $('#title').val('')
        $('#desc').val('')
        if (res.data.message === "updated") {
            alert("data updated successfully!!")
            getNotes()
        }
    }
    async function deleteNote(id) {
        console.log(`id: ${id}`)
        console.log(`token: ${token}`)
        setRecive(false)
        let res = await axios.delete('https://route-egypt-api.herokuapp.com/deleteNote', {
            data: {
                "NoteID": id,
                token

            }
        });
        setRecive(true)
        console.log(res)
        console.log(res.data.message)
        console.log({ "NoteID": id, "token": token })
        if (res.data.message === "deleted") {
            alert("data deleted successfully!!")
            getNotes()
            $("#exampleModal3").removeClass('fade'); $("#exampleModal3").removeClass('show');
            $("#exampleModal2").attr('aria-hidden', "true");
            $("#exampleModal2").removeAttr('role');
            $("#exampleModal2").removeAttr('aria-modal');
            //$('body').removeAttr('style')
            $('body').removeClass('modal-open')
            $("#exampleModal2").remove();
            // $('#exampleModal3').modal('hide');

            $('#title').val('')
            $('#desc').val('')

        }
        else { }
        //alert(res) 


        /*
        "NoteID":"5edd7a356573a6001774adb8", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
        */
    }
    let setRecive =(isRecived)=>{  setrecive(isRecived) }
    let  setID=(id)=>{
        setUserId(id)
    }
//    function setRecive (isRecived){
//         setrecive(isRecived)
//     }
//     function setID(id){
//         setUserId(id)
//     }
    async function getNotes() {
        // alert('get notes here')
        // console.log(userId)
        // console.log(token)
         setID(localStorage.getItem("userID") )
        // console.log(userId)
        // console.log(localStorage.getItem("userID"))
        // setRecive(false) 
        if (token !== null && userId !== "") {
            
            let { data } = await axios.get('https://route-egypt-api.herokuapp.com/getUserNotes', {
                headers: {
                    'userID': userId,
                    'Token': token,
                }
            });
            // setRecive(true)
            // console.log(data)
            console.log(data.Notes)
            console.log(data.message)// no data found or data
            if (data.message === "no notes found") {
                setNoNotee(data.message)
            }
            else {//data.message === "success"
                setNote_(data.Notes)
                console.log(data.Notes)

            }
        }

    }
    function setNoNotee(noNotee){
        setNoNotes(noNotee)
    }
    function setNote_(newArrNotes) {
        setNotesData([newArrNotes])
        // alert('notes sets')
    }
    async function addNote() {
        let usrID = userId;
        let usrTokens = token;
        console.log({ ...note, "userID": usrID, "token": usrTokens })
        setRecive(false)
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/addNote', { ...note, "userID": usrID, "token": usrTokens })
        setRecive(true)
        if (data.message === "success") {
            let newArrNotes = [...notesData]
            newArrNotes.push(note)
            setNote_(newArrNotes)
            //$("#exampleModal").modal("hide");
            $("#exampleModal").remove();
            $("#exampleModal").removeClass('show');
            $("#exampleModal").attr('aria-hidden', "true");
            $("#exampleModal").removeAttr('role');
            $("#exampleModal").removeAttr('aria-modal');
            //$('body').removeAttr('style')
            $('body').removeClass('modal-open')

            $('#title').val('')
            $('#desc').val('')
            alert("data added successfully!!")
            getNotes()
        }
        else { }
    }
    function submitForm(e) {
        e.preventDefault()
        validateData()
    }
    function deletedNoteID(id) {
        setDeleteNoteID(id)
    }
    function takeNoteID(id) {
        setEditedNoteID(id)
    }
    function validateData() {
        let schema = Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required(),
        })
        let res = schema.validate(note, { abortEarly: false })
        if (res.error !== undefined) {
            setErr(res.error.details)
            $('#noteErr').removeClass('d-none')
        }
        else {
            setErr([])
            $('#noteErr').addClass('d-none')
            setNote(res.value)
            addNote()
        }
        console.log(res)
    }
    function saveProps(e) {
        note[e.currentTarget.name] = e.currentTarget.value;
        console.log(note)
    }
    return (
        <>
            <div className="container">

                <button type="button" className="btn btn-success d-block ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Notes
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={(e) => { submitForm(e) }}>
                                <div className="modal-body">
                                    <p className='alert alert-danger d-none' id='noteErr'>{(err.length !== 0) ? err.map((er) => {
                                        return er.message
                                    }) : ""}</p>
                                    <div className="mb-3">
                                        <input className='form-control' onChange={(e) => { saveProps(e) }} type="text" placeholder="Type your note's title" name="title" id='title' />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className='form-control' onChange={(e) => { saveProps(e) }} cols="30" rows="10" placeholder='Type your note' name="desc" id="desc"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" value={recive ? "Add" : "waiting..."} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <div className="modal-body">
                                    <p className='alert alert-danger d-none' id='noteErr'>{(err.length !== 0) ? err.map((er) => {
                                        return er.message
                                    }) : ""}</p>
                                    {/* editedNoteID */}
                                    {console.log(notesData.filter((note) => { return note._id === editedNoteID }))
                                    }
                                    <div className="mb-3">
                                        <input className='form-control' onChange={(e) => { saveProps(e) }} type="text" placeholder="Type your note's title" value={
                                            notesData.filter((note) => { return note._id === editedNoteID }).length !== 0 ?
                                                (notesData.filter((note) => { return note._id === editedNoteID }))[0].title : ""
                                        } name="title" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className='form-control' onChange={(e) => { saveProps(e) }} cols="30" rows="10" placeholder='Type your note' name="desc" value={
                                            notesData.filter((note) => { return note._id === editedNoteID }).length !== 0 ?
                                                (notesData.filter((note) => { return note._id === editedNoteID }))[0].desc : ""
                                        }></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" onClick={() => { submitUpdateForm(editedNoteID) }} value={recive ? "Update" : "waiting..."} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <div className="modal-body">
                                    <p className='text-info'>Do you really want to delete ?
                                        process cannot be undone</p>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn btn-primary" onClick={() => { deleteNote(deleteNoteID) }} value={recive ? "Delete" : "waiting..."} />
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    { 
                        (notesData.length !== 0) ? (notesData.map((note) => {
                            return (<div className="col-md-3 mb-2 " key={note._id}>
                                <div className="box shadow bg-info p-2 position-relative">

                                    {/*  */}
                                    <div className="btn-group position-absolute more">
                                        <button type="button" className="btn btn-danger"><i className="fa-solid fa-gear"></i> </button>
                                        <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item d-flex justify-content-between" href="#" onClick={() => { takeNoteID(note._id) }} data-bs-toggle="modal" data-bs-target="#exampleModal3"><span>Edit</span><i className="fa-solid fa-pen-to-square"></i></a></li>
                                            <li><a className="dropdown-item d-flex justify-content-between " data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { deletedNoteID(note._id) }} href="#"><span>Delete</span><i className="fa-solid fa-trash"></i></a></li>
                                        </ul>
                                    </div>
                                    {/*  */}
                                    {/* <i className="fa-solid more fa-ellipsis-vertical position-absolute" ></i>
                                    <div className='position-absolute subMenu bg-white w-50 '>
                                        <ul className='list-unstyled w-100'>
                                            <li className='w-100 text-primary d-flex justify-content-between'><span>Edit</span><i className="fa-solid fa-pen-to-square"></i></li>
                                            <li className='w-100 text-danger d-flex justify-content-between'><span>Delete</span><i className="fa-solid fa-pen-to-square"></i></li>

                                        </ul>
                                    </div> */}

                                    {/* <div className="note-title">{note._id}</div> */}
                                    <div className="note-title mb-3 fw-bold">{note.title}</div>
                                    <div className="note-desc">{note.desc}</div>
                                </div>
                            </div>)
                        })) : <div className='alert alert-info m-auto w-50 text-center'>{noNotes}</div>


                    }


                </div>
            </div>




        </>
    )
}
