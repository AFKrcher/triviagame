import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "3vw",
    marginTop: "1vw",
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: "4vw"
  },
  answerButton: {
    width: "36%",
    height: "5vw",
    marginTop: "1vw",
    fontSize: "1vw",
    fontFamily: "'Orbitron', sans-serif",

  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: "2vw",
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: "2px solid white",
    borderTop: "2px solid white",
    marginTop: "1vw"
  },
  timeText: {
    color: 'white',
    fontSize: '3vw',
    fontFamily: "'Orbitron', sans-serif",
  },
  quizText: {
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "2vw",
    marginTop: "1vw",
    marginBottom: "1vw"
  },
  clockContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: "8vw",
  },
  playerList: {
    border: "4px solid #285790",
    borderRadius: "4px",
    boxShadow: "4px 4px #142B47",
    paddingLeft: "5vw",
    paddingRight: "5vw",
    marginTop: "2vw",
  },
  listText: {
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "1.5vw",
  },
  
  upload: {
    marginLeft: "1vw",
    marginTop: "1.25vw",
    color: 'white'
  },
  uploadTop: {
    color: 'white',
    marginTop: "1vw",
  },
  countdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  startButton: {
    marginTop: "1vw",
  },
  listSubheader: {
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
  },
  fileDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '565px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ".5vw",
    marginBottom: ".5vw",
    border: "4px solid #285790",
    borderRadius: "4px",
    boxShadow: "4px 4px #142B47",
  }, 
  outerFormContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }, 
  timerInputDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '200px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: "1vw",
    padding: ".5vw",
    border: "4px solid #285790",
    borderRadius: "4px",
    boxShadow: "4px 4px #142B47",
  },
  timerInput: {
    marginRight: "1vw",
    height: "30px",
    fontSize: "20px",
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    background: '#03031A'
  },
  quizSelectDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '250px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: "1vw",
    padding: ".5vw",
    border: "4px solid #285790",
    borderRadius: "4px",
    boxShadow: "4px 4px #142B47",
  },
  selectQuiz: {
    marginRight: "1vw",
    height: "35px",
    width: "100px",
    fontSize: "20px",
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    background: '#03031A',
    boxShadow: "3px 3px #142B47",

  }
}));

export default useStyles;