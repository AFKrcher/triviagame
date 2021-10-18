import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
     title: {
          fontFamily: "'Cinzel', serif",
          fontSize: "5vw",
          color: 'white',
          background: "-webkit-linear-gradient(white, #D4D6D3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
     },
     container: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
     },
     logo: {
          width: "15vw",
          paddingTop: "5vw",
          filter: "invert(1)",
     },
     usernameInput: {
          width: "15vw",
          marginRight: "2vw",
          backgroundColor: 'white',
          border: "2px solid",
          borderRadius: "5px",
     },
     roomInput: {
          width: "10vw",
          marginRight: "2vw",
          backgroundColor: 'white',
          height: "60px",
          marginBottom: "15px",
          border: "2px solid",
          borderRadius: "5px",
     },
     fileUpload: {
          marginTop: "1vw",
          color: 'white',
          width: "250px",
     },
     titleUpload: {
          background: 'white',
          border: "2px solid",
          borderRadius: "5px",
          marginRight: "1vw",
          height: "60px",
          
     },
     fileLabel:{
          marginTop: "1vw",
          marginRight: ".5vw",
          color: 'white',
     },
     fileDiv: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
     },  
}));

export default useStyles;