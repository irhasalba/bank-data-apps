import React from "react";
import CardComponent from "../components/CardComponent";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const icon = <FontAwesomeIcon icon={faDatabase} />;
const Home = () => {
    return (
        <React.Fragment>
            <Header title="Dashboard Page" />
            <NavbarComponent />
            <CardComponent title="Data Arsip" icon={icon} />
        </React.Fragment>
    );
};

export default Home;
