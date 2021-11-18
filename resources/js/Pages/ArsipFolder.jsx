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

const ArsipFolder = () => {
    const [values, setValues] = useState({
        nama_folder: "",
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
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
                                <Link
                                    href={route("dashboard.arsip")}
                                    className="btn btn-warning ml-2"
                                >
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
