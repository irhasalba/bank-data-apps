import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Table, Alert } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/inertia-react";

const ListFileFolder = (props) => {
    const { listfile, id_folder, flash } = props;
    const alert =
        flash.message != null ? <Alert dismissible>{flash.message}</Alert> : "";
    const [visible, SetVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            SetVisible(true);
        }, 3000);
    });

    return (
        <>
            <Header title="Halaman List File" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    <CardBody>
                        {visible != true ? alert : ""}
                        <Link
                            className="btn btn-primary btn-sm mb-3"
                            href={route("dashboard.arsip.upload", id_folder)}
                        >
                            Upload File
                        </Link>
                        <Table bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama File</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listfile.map((file, key) => {
                                    return (
                                        <tr key={key + 1}>
                                            <td>{key + 1}</td>
                                            <td>{file.files}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-success btn-sm "
                                                    title="lihat"
                                                    href={route(
                                                        "dashboard.show.files",
                                                        file.id
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <thead>
                                <th>No</th>
                                <th>Nama File</th>
                                <th>Aksi</th>
                            </thead>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default ListFileFolder;
