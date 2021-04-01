
import {Divider} from "@material-ui/core";

const CertificateCard = ({classes, title, src, setIndex, index}) => {
    return (
        <div className={classes.card} onClick={() => setIndex(index)}>
            <h3>{title}</h3>
            <img src={src} width="100%"/>
            <Divider/>
        </div>
    )
}


export default CertificateCard