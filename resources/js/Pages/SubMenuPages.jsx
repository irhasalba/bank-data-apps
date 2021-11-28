import { Link } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Alert } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";

const SubMenuPages = (props) => {
    const { submenu, id_parent, flash } = props;
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
            <Header title="Halaman Sub Menu" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    {visible != true ? alert : ""}
                    <CardBody>
                        <Link
                            className="btn btn-primary mb-3 btn-sm"
                            href={route("dashboard.tambah.submenu", id_parent)}
                        >
                            Tambah Sub Menu
                        </Link>
                        <Table bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center">No</th>
                                    <th className="text-center">
                                        Jenis Menu Pengarsipan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {submenu.map((data, key) => {
                                    return (
                                        <tr key={key + 1}>
                                            <td className="text-center">
                                                {key + 1}
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    href={route(
                                                        "dashboard.list.submenu.folder",
                                                        data.id
                                                    )}
                                                >
                                                    {data.nama_submenu}
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default SubMenuPages;
