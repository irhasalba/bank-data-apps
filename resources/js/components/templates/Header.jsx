import React from "react";

const Header = (props) => {
    const { title } = props;
    return (
        <>
            <title>Bank Data Apps | {title}</title>
        </>
    );
};

export default Header;
