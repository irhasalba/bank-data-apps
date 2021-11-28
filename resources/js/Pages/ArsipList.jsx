import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Alert } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";

const ArsipList = (props) => {
    const { arsip, flash, id_parent, id_submenu } = props;
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
            <Header title="Halaman Kelola Arsip" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    <CardBody>
                        {visible != true ? alert : ""}
                        <Link
                            className="btn btn-primary mb-2 btn-sm"
                            href={route("dashboard.tambah.arsip", {
                                id_parent: id_parent,
                                id_submenu: id_submenu,
                            })}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Tambah Folder Baru
                        </Link>
                        <Table bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Nama Folder</th>
                                    <th>Tanggal Pembuatan</th>
                                    <th>Tanggal Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arsip.map((arsip) => {
                                    return (
                                        <tr key={arsip.id}>
                                            <td>
                                                {" "}
                                                <Link
                                                    href={route(
                                                        "dashboard.arsip.folder",
                                                        arsip.id
                                                    )}
                                                >
                                                    {arsip.nama_folder}
                                                </Link>
                                            </td>
                                            <td>{arsip.created_at}</td>
                                            <td>{arsip.updated_at}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Nama Folder</th>
                                    <th>Tanggal Pembuatan</th>
                                    <th>Tanggal Update</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default ArsipList;
