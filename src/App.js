import {makeStyles} from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { render } from 'react-dom'
import Welcome from "./components/welcome/Welcome";
import Skill from "./components/skills/Skill";
import AboutMe from "./components/aboutMe/AboutMe";
import CertificateAchievements from "./components/certificateAchievements/CertificateAchievements";
import Project from "./components/projects/Project";
import { useTransition, animated } from 'react-spring'

const pages = [
    ({style}) => <animated.div style={{...style, background: 'lightpink'}}><Welcome/></animated.div>,
    ({style}) => <animated.div style={{...style, background: 'lightblue'}}><AboutMe/></animated.div>,
    ({style}) => <animated.div style={{...style, background: 'lightgreen'}}><Skill/></animated.div>,
]
const cursor = {
    show: false,
    blink: true,
    element: '|',
    hideWhenDone: true,
    hideWhenDoneDelay: 10,
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"> <Welcome cursor={cursor} /></Route>
                <Route exact path="/skill"><Skill/></Route>
                <Route exact path="/aboutMe"><AboutMe cursor={cursor}/></Route>
                <Route exact path="/certificateAchievement"><CertificateAchievements cursor={cursor}/></Route>
                <Route exact path="/project"><Project/></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </Router>
    )
}
