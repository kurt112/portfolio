
import {Divider} from "@material-ui/core";

const ProjectCard = ({classes, title, src, setIndex, index}) => {
    return (
        <div className={classes.card} onClick={() => setIndex(index)}>
            <h3>{title}</h3>
            <video width='100%' >
                <source src={src} type="video/mp4"/>
            </video>

            <Divider/>
        </div>
    )
}


export default ProjectCard