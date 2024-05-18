import React, {Fragment} from "react";
import './App.css';
import Footer from './components/Footer';
import ExperienceList from "./component/TagsScreen";
const App = () => (
    <Fragment>

            <ExperienceList />
        <Footer text = "&#169; 2024, Keiken Digital solutions"></Footer>
    </Fragment>
);

export default App;
