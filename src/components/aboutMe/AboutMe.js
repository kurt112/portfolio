import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Button, Divider, Paper} from "@material-ui/core";
import Typist from 'react-typist';
import me from "../../_asets/me.jpg"
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontFamily: 'Anton, sans-serif',
        backgroundColor: '#06f8d1',

        overflowY: 'auto',
        '& h1': {
            // fontSize: 0,
        }
    },
    data:{
        display:'flex',
        flexDirection:'column',
        // justifyContent:'',
        alignItems:'center',
        width: '90%',
        height: '80%',
        padding: 20,
        color:'black'
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    text:{
        textAlign:'center',
        fontSize: 20,
        color:'black',
        flex: 1
    }


}));


const AboutMe = ({cursor}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>

            <Paper className={classes.data}>
                <Avatar alt="Remy Sharp" src={me} className={classes.large} />
                <br/>
                <Divider style={{width: '100%', backgroundColor:'grey'}}/>
                <br/>
                <h1>About Me</h1>
                <br/>
                <Typist className={classes.text} cursor={cursor}>
                    Hello, I'm Kurt Orioque. I enjoy taking complex problems and turning then into
                    simple and beautiful interface design. I also love the logic and structure
                    of coding and always strive to write elegant and efficient code.

                    <br/>  <br/>

                    I specialize creating a webApp or Mobile App.

                    <br/>    <br/>
                    When I'm not coding you'll find me in the gym or playing guitar or playing video games.

                    <br/><br/>

                    Currently I'm taking Computer Science at Gardner College  I'm now at 3rd year (Graduating).


                </Typist>

                <Link to="/" style={{textDecoration:'none'}}>
                    <Button variant="contained" color="primary" disableElevation style={{width: '100px'}}>Back</Button>
                </Link>
            </Paper>
        </div>
    )
}

export default AboutMe;
