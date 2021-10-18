import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from "socket.io-client";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Slide from "@material-ui/core/Slide";
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../style/GamepageUI.js'
import './Gamepage.css';
import Confetti from 'react-confetti'

function Gamepage() {
  const classes = useStyles();
  const location = useLocation();
  const username = location.state.params.username
  const room = location.state.params.room
  const [socket, setSocket] = useState()
  const [users, setUsers] = useState([])
  const [myAnswer, setMyAnswer] = useState()
  const [quiz, setQuiz] = useState([{ question: 'Loading', answers: ['Loading'] }])
  const [answeredQuestion, setAnsweredQuestion] = useState(false)
  const [totalTime, setTotalTime] = useState()
  const [time, setTime] = useState(10)
  const [timerOn, setTimerOn] = useState(false);
  const [index, setIndex] = useState(0)
  const [host, setHost] = useState(false)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [titles, setTitles] = useState([])
  const [quizLen, setQuizLen] = useState(0)
  const [trigger, setTrigger] = useState(false)
  const [winner, setWinner] = useState('Everyone wins')

  useEffect(() => {
    // fetch("https://sdi05-04.staging.dso.mil/api/files/titles")
    // fetch("http://localhost:8080/files/titles")
    // .then(resp=>resp.json())
    // .then(data=>{
    //   setTitles(data)
    // })
    
    // const newsocket = io("https://sdi05-04.staging.dso.mil", {
    //   path: "/api/socket.io/",
    //   transport: ['websocket', 'polling', 'flashsocket']
    // });
    const newsocket = io("http://localhost:8080", {
      path: "/socket.io/",
      transport: ['websocket', 'polling', 'flashsocket']
    });

    setSocket(newsocket)
    newsocket.emit('joinGame', { username, room });
    newsocket.on('roomUsers', users => {
      setUsers(users)
      let findHost = users.filter(user => user.host === true)
      if (findHost.length > 0) {
        if (findHost[0].username === username) {
          setHost(true)
          console.log('You are the Host, Congrats!')
        }
      }
    })
    newsocket.on('quiz start', function (data) {
      data.map((obj) => {
        return { ...obj, answers: obj.answers.sort(() => (Math.random() > .5) ? 1 : -1) }
      })
      console.log("joining room: the quiz is: ", data)
      setQuiz(data)
      setQuizLen(data.length)
    })
    newsocket.on('timer set start', (timer) => {
      console.log("joining room: the timer has been set to: ", timer)
      setTime(timer)
      setTotalTime(timer)
    })
  }, [])
  
  if (socket) {
    socket.on('user has left', (data) => {
      console.log("user has left: ", data)
    })
   
    socket.on('end the timer', () => {
      console.log("the timer has ended")
      setTimerOn(false)
      setTime(totalTime)
      setAnsweredQuestion(false)
      setMyAnswer('')
      setIndex(0)
    })
    socket.on('quiz', function (data) {
      data.map((obj) => {
        return { ...obj, answers: obj.answers.sort(() => (Math.random() > .5) ? 1 : -1) }
      })
      console.log('already in room: this is the quiz: ', data)
      setQuiz(data)
      setQuizLen(data.length)
    });

    socket.on('current player', function (data) {
      console.log("score updated: ", data)
      setUsers(data)
    });
    socket.on('timer set', (timer) => {
      console.log("the timer has been set, already in room: ", timer)
      setTime(timer)
      setTotalTime(timer)
    })
  }
  
  function clickAnswer(answer) {
    if (!answeredQuestion) {
      setMyAnswer(answer)
      setAnsweredQuestion(true)
      socket.emit('answer', { answer, room, index })
      socket.on('correct answer', (data) => {
        document.getElementById(data).style.backgroundColor= "green"
      })
    }
  }
  if (socket) {
    socket.on('start the timer', () => {
      console.log("the timer has started")
      setTimerOn(true)
    })
  }

  function startTimer() {
    socket.emit('StartGame', room)
  }

  function resetGame() {
    socket.emit('reset game', room)
  }

  useEffect(() => {
    // If the timer is on...
    if (timerOn) {
      
      // Count down to 0
      if (time >= 0 && quizLen > 0) {
        const timer = setTimeout(() => {
          console.log("the time of the game: ", time)
          setTime(() => time - 1)
        }, 1000)
      } 
      // After 0, if there's more questions, move to the next question
      else if(time === -1 && index < quizLen -1) {
        setTime(totalTime)
        setIndex(() => index+1)
        setAnsweredQuestion(false)
        let allButtons = document.getElementsByClassName('answer-button')
        for(let i = 0; i < allButtons.length; i++){
          allButtons[i].style.backgroundColor = "#e0e0e0"
        }
      // After the last question, end the game.
      } else {
        console.log("game over yo")
        setWinner(users[0].username)
        setTimerOn(false)
        setTime(totalTime)
        setIndex(0)
        setAnsweredQuestion(false)
        setMyAnswer('')
        setTrigger(true)
        setOpen2(true)
      } 
    }
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

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
    setData(text)
    socket.emit('upload', { result, room })
    setOpen(true)
  }

  function timeHandler(e){
    e.preventDefault()
    let timer = e.target.time.value
    socket.emit('set timer', {timer, room})
  }
  
  function quizHandler(e){
    e.preventDefault()
    let selectedQuiz = e.target.quizBox.value
    socket.emit('set quiz database', {room, selectedQuiz})
  }

  return (
    <div className={classes.outerContainer} id="outer-container">
         <Confetti
      width={2000}
      height={1000}
      run = {trigger}
      numberOfPieces={1000}
      recycle ={false}
      onConfettiComplete={() => setTrigger(false)} 
    />
    <Snackbar
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            open={open2}
            autoHideDuration={5000}
            onClose={handleClose2}
            message={`${winner} has won the game. Congrats!`}
            action={
                <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                <CloseIcon fontSize="small" />
                </IconButton>
                </React.Fragment>
            }
      />
      <div className={classes.container}>
        <Slide
          in={true}
          timeout={500}
          direction="down"
        >
          <Typography className={classes.title}>Welcome to Trivial Elite!</Typography>
        </Slide>
      </div>
      <Slide
        in={true}
        timeout={500}
        direction="down"
      >
        <div className={classes.container}>
          <Typography className={classes.title}>Room: {room}</Typography>
        </div>
      </Slide>
      {
        (host) ?
          <div className={classes.outerFormContainer}>
            <form onSubmit={formHandler} className={classes.fileDiv}>
              <InputLabel id="trivia" for="trivia" className={classes.uploadTop}>Load temporary trivia csv: </InputLabel >
              <input type="file" id="trivia" name="trivia" accept=".csv" className={classes.upload} />
              <Button variant="contained" color="primary" type="submit" >Submit </Button>
            </form>
            <form className={classes.timerInputDiv} onSubmit={timeHandler}>
              <input className={classes.timerInput} id="time" placeholder="10" min="5" max="60" type="number" />
              <Button variant="contained" color="primary" type="submit">Set time</Button>
            </form>
            <form className={classes.quizSelectDiv} onSubmit={quizHandler}>
              <select id="quizBox" className={classes.selectQuiz}>
                {titles.map(title=>{
                  return(
                    <option value={title.title}>{title.title}</option>
                  )
                })}
              </select>
              <Button variant="contained" color="primary" type="submit">Set Quiz</Button>
            </form>
          </div>
          :
          <div></div>
      }
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
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

      <div id="clock" className={classes.clockContainer}>
        <List subheader={
          <ListSubheader className={classes.listSubheader} component="div" id="nested-list-subheader">
            Leaderboard
          </ListSubheader>
        }
          dense={true}
          className={classes.playerList}
        >
          {users && users.map((user, index) => <ListItem key={index}>{(user.host) ? <span className={classes.listText}>{user.username} (Host) - Score: {user.score}</span> : <span className={classes.listText}>{user.username} - Score: {user.score}</span>}</ListItem>)}
        </List>
        <div className={classes.countdownContainer}>
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={(time / totalTime) * 100} size='10vw' className={classes.clock}/>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.timeText} variant="caption" component="div" color="textSecondary">{time}</Typography>
            </Box>
          </Box>
          {(host) ? <span id="buttons" className={classes.startButton}>
            {timerOn ? <Button variant="contained" color="primary" onClick={resetGame}>Reset Game</Button> : <Button variant="contained" color="primary" onClick={startTimer}>Start Timer</Button>}
          </span> : <span></span>}
        </div>
      </div>
      <div className={classes.bottomContainer}>
        {users && users.filter(player => player.id === socket.id).map(player => <span className={classes.listText}>Your score: {player.score}</span>)}
        <Typography className={classes.listText}>Answer selected: {myAnswer}</Typography>

      </div>
      <div className={classes.questionContainer}>
      <Slide
        in={true}
        timeout={500}
        direction="up"
      >
        <Typography className={classes.quizText}>
          {timerOn ? quiz[index].question : 'Waiting for host to start game.'}
        </Typography>
        </Slide>
      </div>
      <div className={classes.gridContainer}>
        {timerOn && quiz[index].answers.map((answer) => {
          return (
          <Button className={`${classes.answerButton} answer-button`} variant="contained" id={answer} onClick={() => clickAnswer(answer)}>{answer}</Button>
          )
        })}
      </div>
    </div >
  )
}

export default Gamepage;
