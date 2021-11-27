import React from "react";
import CardComponent from "../components/CardComponent";
import Header from "../components/templates/Header";
import NavbarComponent from "../components/templates/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCircleNotch,
    faDatabase,
    faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "@inertiajs/inertia-react";

const icon = <FontAwesomeIcon icon={faDatabase} />;
const Home = (props) => {
    console.log(props);
    const { menu } = props;
    return (
        <React.Fragment>
            <Header title="Dashboard Page" />
            <NavbarComponent />
            <div className="container mt-5">
                <Card>
                    <CardTitle className="text-center mt-2">
                        <b>Data Pengarsipan</b>
                    </CardTitle>
                    <CardBody>
                        <ul>
                            {menu.map((menuData) => {
                                return (
                                    <li key={menuData.id}>
                                        <Link
                                            href={route(
                                                "dashboard.submenu",
                                                menuData.id
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleNotch}
                                            />{" "}
                                            {menuData.nama_menu}
                                        </Link>{" "}
                                    </li>
                                );
                            })}
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default Home;
