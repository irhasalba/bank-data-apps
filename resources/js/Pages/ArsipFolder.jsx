import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
    CardText,
    Button,
} from "reactstrap";
import HeaderComponent from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";
import { faPlus, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/inertia-react";

const ArsipFolder = (props) => {
    const { submenu } = props;
    const [values, setValues] = useState({
        id_parent: submenu.id_parent,
        nama_folder: "",
        id_submenu: submenu.id_submenu,
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        Inertia.post(route("dashboard.simpan.arsip"), values);
    };
    const handlerchange = (e) => {
        let data = { ...values };
        data[e.target.name] = e.target.value;
        setValues(data);
    };
    return (
        <>
            <HeaderComponent title="Tambah Folder Baru" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card style={{ width: "39rem" }}>
                    <CardBody>
                        <CardText>
                            <form onSubmit={handlerSubmit}>
                                <FormGroup>
                                    <Label for="id_folder">
                                        Lokasi Induk Folder
                                    </Label>
                                    <Input
                                        id="id_folder"
                                        name="id_folder"
                                        value={submenu.nama_sub_menu}
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="nama_folder">Nama Folder</Label>
                                    <Input
                                        id="nama_folder"
                                        name="nama_folder"
                                        placeholder="masukan nama folder"
                                        type="text"
                                        value={values.name}
                                        onChange={handlerchange}
                                    />
                                </FormGroup>
                                <Button color="primary" type="submit">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah
                                </Button>
                                <Link href="#" className="btn btn-warning ml-2">
                                    <FontAwesomeIcon icon={faUndo} /> Kembali
                                </Link>
                            </form>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default ArsipFolder;
