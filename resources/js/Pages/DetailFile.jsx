import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";

const DetailFile = (props) => {
    const { detail_file } = props;
    const deleteFile = () => {
        Inertia.delete(route("dashboard.hapus.file", detail_file.id));
    };
    return (
        <>
            <Header title="Halaman Detail File" />
            <NavbarComponent />
            <Card>
                <CardBody>
                    <Row>
                        <Col md="3">
                            <img
                                src={route("dashboard.photo", detail_file.id)}
                                width="200"
                                height="200"
                            />
                        </Col>
                        <Col md="9">
                            <table>
                                <tr>Nama File : {detail_file.files}</tr>
                                <tr>
                                    Tanggal Upload : {detail_file.created_at}
                                </tr>
                            </table>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={deleteFile}
                            >
                                Hapus Foto
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};

export default DetailFile;
