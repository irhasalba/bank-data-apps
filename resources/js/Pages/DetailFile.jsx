import React from "react";
import { Card, CardBody } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";

const DetailFile = (props) => {
    const { detail_file } = props;
    return (
        <>
            <Header title="Halaman Detail File" />
            <NavbarComponent />
            <Card>
                <CardBody>{detail_file.files}</CardBody>
            </Card>
        </>
    );
};

export default DetailFile;
