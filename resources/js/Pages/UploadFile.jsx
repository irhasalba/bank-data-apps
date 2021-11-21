import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Input, Label } from "reactstrap";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";

const UploadFile = (props) => {
    const { folder } = props;
    const { data, setData, post } = useForm({
        jenis: "",
        files: null,
        id: folder.id,
    });
    const handlerSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("jenis", data.jenis);
        formData.append("file", data.files);
        formData.append("id_folder", data.id);
        Inertia.post(route("dashboard.save.upload"), formData);
    };

    return (
        <>
            <Header title="Halaman Upload File" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    <CardBody>
                        <form onSubmit={handlerSubmit}>
                            <FormGroup>
                                <Label>Lokasi Folder</Label>
                                <Input value={folder.nama_folder} readOnly />
                            </FormGroup>
                            <Label>Pilih Jenis Upload</Label>
                            <FormGroup check>
                                <Input
                                    name="jenis"
                                    type="radio"
                                    value="1"
                                    onChange={(e) =>
                                        setData("jenis", e.target.value)
                                    }
                                    checked={data.jenis == 1}
                                />
                                <Label>Gambar/Foto</Label>{" "}
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="jenis"
                                    type="radio"
                                    value="0"
                                    onChange={(e) =>
                                        setData("jenis", e.target.value)
                                    }
                                />{" "}
                                <Label>Arsip File(PDF,Docx,Excel)</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-3">Upload File</Label>
                                <Input
                                    type="file"
                                    multiple
                                    name="files[]"
                                    onChange={(e) =>
                                        setData("files", e.target.files[0])
                                    }
                                />
                            </FormGroup>
                            <Button color="primary" size="sm" type="submit">
                                Simpan Data
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default UploadFile;
