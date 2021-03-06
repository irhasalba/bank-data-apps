import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    FormGroup,
    Input,
    Label,
    Alert,
    Row,
    Col,
} from "reactstrap";
import Header from "../components/templates/Header.jsx";
import { Inertia } from "@inertiajs/inertia";
import bannerImage from "../assets/img/123 (1).png";
import { Link } from "@inertiajs/inertia-react";

const Login = (props = null) => {
    console.log(props);
    const { flash } = props;
    const alert =
        flash.message != null ? (
            <Alert dismissible color="danger">
                {flash.message}
            </Alert>
        ) : (
            ""
        );
    const [values, setValue] = useState({
        password: "",
        email: "",
    });
    const [visible, SetVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            SetVisible(true);
        }, 3000);
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("user.login"), values);
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
                        style={{ width: "100rem" }}
                        className="shadow p-3 mb-5 bg-white rounded"
                    >
                        <CardBody>
                            <CardTitle tag="h2" className="text-center">
                                Login Aplikasi Bank Data
                            </CardTitle>
                            <Row>
                                <Col>
                                    <img
                                        src={bannerImage}
                                        width="500"
                                        height="350"
                                    />
                                </Col>
                                <Col>
                                    <CardText>
                                        <form onSubmit={handlerSubmit}>
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
                                                <Label for="password">
                                                    password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    placeholder="masukan password anda"
                                                    type="password"
                                                    value={values.password}
                                                    onChange={handlerchange}
                                                />
                                            </FormGroup>
                                            <Button
                                                color="primary"
                                                type="submit"
                                            >
                                                Login
                                            </Button>
                                            <p>
                                                Silahkan{" "}
                                                <Link href={route("regis")}>
                                                    klik Disini{" "}
                                                </Link>
                                                Untuk Membuat Akun
                                            </p>
                                        </form>
                                    </CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
