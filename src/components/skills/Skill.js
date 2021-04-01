import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

import SkillCard from "./SkillCard";

import skillData from "./skillData";

const useStyles = makeStyles(() => ({
    skillPage: {
        textAlign: 'center',
        height: '100%',
        fontFamily: 'Anton, sans-serif',
        backgroundColor: '#083b5f',
        color: 'white',
        padding: 10,
        overflowY: 'auto',
        '& h1': {
            // fontSize: 0,
        }
    },
    button: {
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: 'white',
        marginBottom: 20,
        textDecoration: 'none',
        listStyle: 'none',
        '&:hover': {
            backgroundColor: 'white',
        }
    }

}));


const Skill = () => {
    const classes = useStyles()

    return (
        <div className={classes.skillPage}>

            <Grid container spacing={1}>
                {
                    skillData.map(e => {
                        return (
                            <Grid container item md={3} xs={12}>
                                <SkillCard location={e.img} rating={e.rating} title={e.title}/>
                            </Grid>
                        )
                    })
                    }
                    </Grid>
                    <br/>
                    <Link to="/" style={{textDecoration: 'none'}}>
                    <Button variant={'outlined'}  className={classes.button}>
                    Back
                    </Button>
                    </Link>

                    </div>
                    )
                }

                export default Skill;