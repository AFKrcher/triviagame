import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import supraGif from '../images/supragif2.gif'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import '../style/Mainpage.css'
import useStyles from '../style/MainpageUI.js'

function Mainpage() {
     const classes = useStyles();
     const history = useHistory()
     const [user, setUser] = useState('')
     const [room, setRoom] = useState('')
     const [title, setTitle] = useState('')
     const [open, setOpen] = useState(false);

     function submitHandler(e) {
          e.preventDefault()
          history.push(`/${room}`, { params: { username: user, room: room } })
     }

     async function formHandler(e) {
          e.preventDefault()
          const text = await e.target.trivia.files[0].text()
          var result = text.split('\r').join().split('\n')
          for (let i = 0; i < result.length; i++) {
            result[i] = result[i].split(',')
            result[i] = result[i].filter(x => x !== "\r" && x !== "")
            result[i] = { question: result[i][0], answers: result[i].slice(1, result[i].length) }
          }
          result = result.splice(0, result.length - 1)
          result = result.map(question => {return {...question, answers: question.answers.join(','), title: title || "you stink"}})
          // fetch('https://sdi05-04.staging.dso.mil/api/newfile', {
               fetch('http://localhost:8080/newfile', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                 },
                 body: JSON.stringify(result)
               })
                 .then((response) => {
                      setOpen(true)
                      console.log(response)})
                 .catch(err => {
                      alert(`There was an error: ${err}`)
                    })
     }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

     return (
         
          <div id="main-page-background">
               <div id='stars' />
               <div id='stars2' />
               <div id='stars3' />
               <div className={classes.container}>
                    <img src={supraGif} alt="supra" className={classes.logo} />        
               </div>
               <div className={classes.container}>             
                    <Typography className={classes.title}>
                         Trivial Elite
                    </Typography>
               </div>
               <div className={classes.container}>
                    <TextField label="Username" variant="outlined" onChange={(e) => setUser(e.target.value)} className={classes.usernameInput} />
                    <FormControl >
                         <InputLabel color="primary" id="room" >Room</InputLabel>
                         <Select
                              className={classes.roomInput}
                              labelId="room"
                              id="room"
                              value={room}
                              onChange={(e) => setRoom(e.target.value)}
                              defaultValue="One"
                         >
                              <MenuItem value={"One"}>One</MenuItem>
                              <MenuItem value={"Two"}>Two</MenuItem>
                              <MenuItem value={"Three"}>Three</MenuItem>
                              <MenuItem value={"Four"}>Four</MenuItem>
                         </Select>
                    </FormControl>
                    <Button onClick={submitHandler} type="submit" variant="contained" color="primary">
                         Join Room
                    </Button>
               </div>
               <div className={`${classes.container}`}>
              
                    <form onSubmit={formHandler} className={classes.fileDiv}>
                         <InputLabel id="trivia" for="trivia" className={classes.fileLabel}>Upload Trivia .csv:</InputLabel >
                         <input type="file" id="trivia" name="trivia" accept=".csv" className={classes.fileUpload} required={true}/>
                         <Input type="text" placeholder="Title" className={classes.titleUpload} onChange={(e) => setTitle(e.target.value)} required={true}/>
                         <Button type="submit" variant="contained" color="primary">Upload</Button>
                    </form>
                   
                    </div>
                    <Snackbar
                         anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                         }}
                         open={open}
                         autoHideDuration={6000}
                         onClose={handleClose}
                         message="File successfully uploaded"
                         action={
                              <React.Fragment>
                              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                              <CloseIcon fontSize="small" />
                              </IconButton>
                              </React.Fragment>
                         }
                    />
               </div>

     )
}

export default Mainpage;