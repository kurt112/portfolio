import {Avatar, Chip, Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Typist from 'react-typist';

const useStyles = makeStyles((theme) => ({
    welcome: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        height: '100%',
        backgroundColor: '#d51b51',
        color: 'white',

    },
    h1: {
        fontSize: 70,
        textAlign: 'center',
        fontFamily: 'Anton, sans-serif',
        '& span': {
            fontSize: 20
        }
    },

    title: {
        fontSize: 10,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& div': {
            marginLeft: 10
        }
    },
    link: {
        textDecoration: 'none'
    },
    chip: {
        marginBottom: 20,
    }
}));

const Welcome = ({cursor}) => {
    const classes = useStyles();

    return (
        <div className={classes.welcome}>
            <Typist className={classes.h1} cursor={cursor}>
                Hi I'm

                <Typist.Delay ms={100}/>
                <br/>
                Kurt Lupin Orioque
                <br/>
                <span>FullStack Developer</span>
            </Typist>

            <br/>
            <br/>
            <div className={classes.buttonContainer}>
                <Link to={"/skill"} className={classes.link}>
                    <Chip
                        className={classes.chip}
                        avatar={<Avatar>S</Avatar>}
                        label="Skills"
                        clickable
                        color="primary"
                    />
                </Link>
                <Link to={"/aboutMe"} className={classes.link}>
                    <Chip
                        className={classes.chip}
                        avatar={<Avatar>A</Avatar>}
                        label="About Me"
                        clickable
                        color="primary"

                    />

                </Link>

                <Link to={"/certificateAchievement"} className={classes.link}>
                    <Chip
                        className={classes.chip}
                        avatar={<Avatar>CA</Avatar>}
                        label="Certificate And Achievement"
                        clickable
                        color="primary"
                    />
                </Link>

                <Link to={"/project"} className={classes.link}>
                    <Chip
                        className={classes.chip}
                        avatar={<Avatar>P</Avatar>}
                        label="Projects"
                        clickable
                        color="primary"
                    />
                </Link>


                <a href='https://drive.google.com/file/d/1PXS-3LDAwiwd9iKdPSf6TSgtC_AAY1H6/view?usp=sharing' className={classes.link}>
                    <Chip
                        className={classes.chip}
                        avatar={<Avatar>P</Avatar>}
                        label="Download My CV"
                        clickable
                        color="primary"
                    />
                </a>


            </div>
        </div>

    )
}

export default Welcome;