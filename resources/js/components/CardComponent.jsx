import { Link } from "@inertiajs/inertia-react";
import React from "react";
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
const CardComponent = (props) => {
    const { title, icon } = props;
    return (
        <div>
            <div className="container">
                <Card className="mt-5" style={{ width: "20rem" }}>
                    <CardBody>
                        {icon}{" "}
                        <Link
                            href={route("dashboard.arsip")}
                            className="font-weight-bold"
                        >
                            {title}
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CardComponent;
