import Typist from "react-typist";
import {Avatar, Button, Chip, Divider, Grid, Hidden} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CertificateCard from "./CertificateCard";
import data from './CertificateData'
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Anton, sans-serif'
    },
    side: {
        borderRight: '1px solid rgba(0, 0, 0, .20)',
        height: '100%',
        paddingTop: 20,
        overflowY: 'auto'
    },
    middle: {
        '& button': {
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10
        }
    },
    card: {
        textAlign: 'center',
        width: '100%',
        marginBottom: 10,
        cursor: 'pointer',

    }
}));
const CertificateAchievements = () => {
    const classes = useStyles()
    const [index, setIndex] = useState(0)

    return (
        <div className={classes.root}>
            <Grid container className={classes.root}>
                <Hidden smDown>
                    <Grid item md={2} className={classes.side}>
                        {
                            data.map((e,i) => <CertificateCard
                                setIndex={setIndex}
                                index={i}
                                src={e.src}
                                title={e.title}
                                classes={classes}/>)
                        }
                    </Grid>
                </Hidden>
                <Grid item md={10} sm={10} className={classes.middle}>
                    <Link to="/" style={{textDecoration:'none'}}>
                        <Button color={"primary"} variant={"contained"} disableElevation>Back</Button>
                    </Link>
                    <br/>
                    <Divider/>
                    <br/> <br/>
                    <img src={data[index].src} width='100%' height={'60%'} style={{cursor:'pointer'}}
                         onClick={() => setIndex(index >= data.length-1? index: index+1)}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CertificateAchievements