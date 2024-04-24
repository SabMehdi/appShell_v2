import React, {Fragment} from "react";
import './App.css';
import Footer from './components/Footer';
import LinkedInConnect from './component/LinkedInConnect';
const App = () => (
    <Fragment>
            <LinkedInConnect />

        <Footer text = "&#169; 2024, Keiken Digital solutions"></Footer>
    </Fragment>
);

export default App;
