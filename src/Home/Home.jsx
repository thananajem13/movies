import axios from 'axios';
import Joi from 'joi';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { usrToken } from '../ContextContent/ContextContent';
import $ from 'jquery';
import './Home.css'
export default function Home() {
    // setUserId(localStorage.getItem("userID") )
    const [userIDS, setUserIDS] = useState(localStorage.getItem("userID"))
    // function saveProps(e) {
    //     note[e.currentTarget.name] = e.currentTarget.value;
    //     console.log(note)
    // }
    const saveProps = useCallback((e) => {
        note[e.currentTarget.name] = e.currentTarget.value;
        console.log(note); console.log('Clicked!');
    }, []);
    let setID = (id) => {
        setUserId(id)
    }
    console.log(usrToken)
    console.log(useContext(usrToken))
    const { userId, token, setUserId } = useContext(usrToken);
    // setID(userId)
    console.log(userId)
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
        console.log(notesData)
        // alert(notesData)
    }, [])

    async function submitUpdateForm(id) {
        console.log(id)
        let nottee = notesData.filter((notee) => { return notee._id === id })
        console.log(nottee)
        let { title, desc } = nottee[0]
        console.log(nottee[0], title, desc)
        setRecive(false)
        let res = await axios.put('https://route-egypt-api.herokuapp.com/updateNote', { "title": title, "desc": desc, "NoteID": id, "token": token, "userID": userId })
        setRecive(true)
        console.log(res)
        $('.navbar').css('z-index', '9999')
        $('.container').css({ 'z-index': '9998', 'position': 'relative' })
        if ($('.modal-backdrop').length !== 0) {
            $('.modal-backdrop').remove()
        }
        $('body').css('overflow', 'auto')
        $('#exampleModal3').css('display', "none");

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
            $('.navbar').css('z-index', '9999')
            $('.container').css({ 'z-index': '9998', 'position': 'relative' })
            if ($('.modal-backdrop').length !== 0) {
                $('.modal-backdrop').remove()
            }
            $('body').css('overflow', 'auto')
            $('#exampleModal2').css('display', "none");



            $('#title').val('')
            $('#desc').val('')
            getNotes()
        }
        else { }
        //alert(res) 


        /*
        "NoteID":"5edd7a356573a6001774adb8", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
        */
    }
    let setRecive = (isRecived) => { setrecive(isRecived) }

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
        // setUserId(localStorage.getItem("userID") )
        //  setID(localStorage.getItem("userID") )
        // console.log(userId)
        console.log(localStorage.getItem("userID"))
        console.log(token)
        console.log(userId)
        console.log(userId)
        console.log(userIDS)
        console.log(typeof (userIDS))
        console.log(token)
        console.log(typeof (token))
        // setRecive(false) 
        if (token.length !== 0 && userIDS.length !== 0) {
            console.log(userIDS)
            let { data } = await axios.get('https://route-egypt-api.herokuapp.com/getUserNotes', {
                headers: {
                    'userID': userIDS,
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
                setNotesData(data.Notes)
                // setNote_(data.Notes)
                console.log(data.Notes)

            }
        }

    }
    function setNoNotee(noNotee) {
        setNoNotes(noNotee)
    }
    function setNote_(newArrNotes) {
        setNotesData([newArrNotes])
        // alert('notes sets')
    }
    async function addNote() {
        let usrID = userId;
        let usrTokens = token;
        // let usrID = userId;
        // let usrTokens = token;
        console.log({ ...note })
        console.log({ "userID": usrID })
        console.log({ "token": usrTokens })
        setRecive(false)
        let ID = usrID
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/addNote', { ...note, "userID": usrID, "token": usrTokens })
        setRecive(true)
        if (data.message === "success") {
            let newArrNotes = [...notesData]
            newArrNotes.push(note)
            setNote_(newArrNotes)

            $('.navbar').css('z-index', '9999')
            $('.container').css({ 'z-index': '9998', 'position': 'relative' })
            if ($('.modal-backdrop').length !== 0) {
                $('.modal-backdrop').remove()
            }
            $('body').css('overflow', 'auto')
            $('#exampleModal').css('display', "none");

            $('#title').val('')
            $('#desc').val('')
            alert("data added successfully!!")
            getNotes()
        }
        else { }
    }
    // $('*[data-bs-toggle="modal"]').click(()=>{
    //     $('.modal') && $('.modal input').attr('readonly',false)
    //     console.log( $('.modal input').attr('readonly' ))
    //     alert('clicked')
    // })
    // $('*[data-customerID="22"]');
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
    console.log(notesData)
    console.log(localStorage.getItem("userID"))
    //    setUserId(localStorage.getItem("userID"))
    // $('#exampleModal3').on('shown.bs.modal', function (e) {
    //     $(document).off('focusin.modal');
    // })
    let x =  $('#exampleModal3').on('shown.bs.modal', function (e) {
        $(document).off('focusin.modal');
    })[0]
    console.log(  x )
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
                                    <p className='alert alert-danger d-none' id='noteErr'>{(err.length !== 0) ? err.map((er, i) => {
                                        return <span key={i}>{er.message}</span>
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
                                    <p className='alert alert-danger d-none' id='noteErr'>{(err.length !== 0) ? err.map((er, i) => {
                                        return <span key={i}>{er.message}</span>
                                    }) : ""}</p>
                                    {/* editedNoteID */}
                                    {
                                        console.log(
                                            ...notesData.filter((notee) => {
                                                console.log(notee)
                                                return notee._id === editedNoteID
                                            })
                                        )
                                    }
                                    <div className="mb-3">
                                        <input  className='form-control' onChange={(e) => { saveProps(e) }} type="text" placeholder="Type your note's title" value={
                                            notesData.filter((notee) => { return notee._id === editedNoteID }).length !== 0 ?
                                                (notesData.filter((notee) => { return notee._id === editedNoteID }))[0].title : ""
                                        } name="title" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea  className='form-control' onChange={(e) => { saveProps(e) }} cols="30" rows="10" placeholder='Type your note' name="desc" value={
                                            notesData.filter((notee) => { return notee._id === editedNoteID }).length !== 0 ?
                                                (notesData.filter((notee) => {
                                                    console.log(notee)
                                                    return notee._id === editedNoteID
                                                }))[0].desc : ""
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
                        //    notesData && notesData.map((noteee)=>{return <h1>{noteee?.title}</h1>}) 
                        (notesData.length !== 0) ? (notesData.map((notee) => {
                            return (<div className="col-md-3 mb-2 " key={notee._id}>
                                {console.log(notee)}
                                <div className="box shadow bg-info p-2 position-relative">

                                    {/*  */}
                                    <div className="btn-group position-absolute more">
                                        <button type="button" className="btn btn-danger"><i className="fa-solid fa-gear"></i> </button>
                                        <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                        </button>

                                        <ul className="dropdown-menu">
                                            {/* <span className='bg-danger'>{notee.title}</span> */}
                                            <li><a className="dropdown-item d-flex justify-content-between" href="#" onClick={() => {
                                                //alert(notee)
                                                console.log(notee)
                                                takeNoteID(notee._id)
                                            }} data-bs-toggle="modal" data-bs-target="#exampleModal3"><span>Edit</span><i className="fa-solid fa-pen-to-square"></i></a></li>
                                            <li><a className="dropdown-item d-flex justify-content-between " data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => {
                                                console.log(notee._id);
                                                deletedNoteID(notee._id)
                                            }} href="#"><span>Delete</span><i className="fa-solid fa-trash"></i></a></li>
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
                                    <div className="note-title mb-3 fw-bold">{notee.title}</div>
                                    <div className="note-desc">{notee.desc}</div>
                                </div>
                            </div>)
                        })) : <div className='alert alert-info m-auto w-50 text-center'>{noNotes}</div>


                    }


                </div>
            </div>




        </>
    )
}
