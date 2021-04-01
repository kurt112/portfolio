import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
const useStyles = makeStyles({
    root: {
        width:'100%',

    },
    media: {
        height: 140,
    },
});
const SkillCard = ({location, rating,title}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia style={{   backgroundSize: '70%', backgroundPosition:'center'}}
                    className={classes.media}
                    image={location}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Rating name="half-rating" defaultValue={rating} readOnly={true} />
                </CardContent>
            </CardActionArea>

        </Card>
    )
}

export default SkillCard