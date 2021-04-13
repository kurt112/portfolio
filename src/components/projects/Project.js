import {Button, Divider, Grid, Hidden} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles"
import {useEffect, useState} from "react";
import data from './ProjectData'
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Anton, sans-serif',
        overflowY: 'auto'
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
const Project = () => {
    const classes = useStyles()
    const [index, setIndex] = useState(0)
    const [video, setVideo] = useState([])

    useEffect(() => {
        const temp = video

        data.map((e, index) => temp.push(
                <video  key={index} width='100%' width='100%' height={'80%'} controls>
                    <source src={e.src} type="video/mp4"/>
                </video>
            )
        )

        setVideo([...temp])

        console.log(temp)
    }, [])

    console.log(video)

    return (
        <div className={classes.root}>
            <Grid container className={classes.root}>
                <Hidden smDown>
                    <Grid item md={2} className={classes.side}>
                        {
                            data.map((e, i) => <ProjectCard
                                setIndex={setIndex}
                                index={i}
                                src={e.src}
                                title={e.title}
                                classes={classes}
                                key={i}
                            />)
                        }
                    </Grid>
                </Hidden>
                <Grid item md={10} sm={10} className={classes.middle}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Button color={"primary"} variant={"contained"} disableElevation>Back</Button>
                    </Link>
                    <br/>
                    <Divider/>
                    <br/> <br/>
                    {
                        video[index]
                    }
                    <br/>
                    <br/>
                    <h1>
                        Project Description
                    </h1>
                    <br/>
                    <Divider/>
                    <br/>
                    <p>
                        {data[index].description}
                    </p>
                    <br/>
                    <Button color={"primary"} variant={"contained"} disableElevation href={data[index].resources}>Download
                        Me</Button>
                    <br/>
                    <br/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Project