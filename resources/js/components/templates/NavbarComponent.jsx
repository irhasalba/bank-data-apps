import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";
import Header from "./Header";

const NavbarComponent = () => {
    return (
        <div>
            <Header title="Home page" />
            <Navbar color="primary" expand="md" light>
                <NavbarBrand href={route("home")} className="text-white">
                    Bank Data
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() {}} />
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/" className="text-white">
                                Setting
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href={route("user.logout")}
                                className="text-white"
                            >
                                Log Out
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
