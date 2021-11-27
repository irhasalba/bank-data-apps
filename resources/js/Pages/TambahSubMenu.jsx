import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Input, Label } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";

const TambahSubMenu = (props) => {
    const { id_parent } = props;
    const [values, setValues] = useState({
        subfolder: "",
        id_parent: id_parent,
    });

    const handlerChange = (e) => {
        let dataValues = { ...values };
        dataValues[e.target.name] = e.target.value;
        setValues(dataValues);
    };
    const handlerSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("dashboard.create.submenu"), values);
    };

    return (
        <>
            <Header title="Halaman Tambah Sub Menu" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    <CardBody>
                        <form onSubmit={handlerSubmit}>
                            <FormGroup>
                                <Label>Nama Induk Folder</Label>
                                <Input
                                    type="text"
                                    name="subfolder"
                                    required
                                    onChange={handlerChange}
                                />
                            </FormGroup>
                            <Button color="primary" size="sm">
                                Tambah{" "}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
export default TambahSubMenu;
