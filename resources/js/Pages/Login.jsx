import React, { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import Header from "../components/templates/Header.jsx";
import { Inertia } from "@inertiajs/inertia";

const Login = () => {
    const [values, setValue] = useState({
        name: "",
        password: "",
        email: "",
    });
    const handlerSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("user.register"), values);
    };

    const handlerchange = (e) => {
        let data = { ...values };
        data[e.target.name] = e.target.value;
        setValue(data);
    };

    return (
        <React.Fragment>
            <Header title="Login Page" />
            <div className="container mt-5">
                <div className="d-flex justify-content-center">
                    <Card
                        style={{ width: "50rem" }}
                        className="shadow p-3 mb-5 bg-white rounded"
                    >
                        <CardBody>
                            <CardTitle tag="h2" className="text-center">
                                Login Aplikasi Bank Data
                            </CardTitle>
                            <CardText>
                                <form onSubmit={handlerSubmit}>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="name"
                                            placeholder="masukan username anda"
                                            type="text"
                                            value={values.name}
                                            onChange={handlerchange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="masukan email anda"
                                            type="email"
                                            value={values.email}
                                            onChange={handlerchange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            placeholder="masukan password anda"
                                            type="password"
                                            value={values.password}
                                            onChange={handlerchange}
                                        />
                                    </FormGroup>
                                    <Button color="primary" type="submit">
                                        Login
                                    </Button>
                                </form>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
