import React from 'react';
import {
    Collapse,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';
import style from "./Header.module.css";
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

const Header = (props) => {

    const {logo, navItems} = props;

    const itemList = navItems.map((item) => {
        return(
            <NavItem key={item.url} className={style.navItem}>
                <RouterLink exact={item.exact}
                            activeClassName={style.active}
                            to={item.url}
                            className="nav-link">
                    {item.text}
                </RouterLink>
            </NavItem>
        )
    });

    return (
        <div className={style.navBar}>

            <Navbar expand="md" full light>
                <div className="container">

                    <NavbarBrand>
                        <RouterLink to="/">
                            <img className={style.logo} src={logo} alt=""/>
                        </RouterLink>
                    </NavbarBrand>

                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            {itemList}
                        </Nav>

                    </Collapse>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        className={style.openMenu}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="mr-auto" navbar>
                                {itemList}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </div>

            </Navbar>

        </div>
    );
}

export default Header;
