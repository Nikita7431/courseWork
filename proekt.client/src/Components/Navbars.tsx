import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


export function Navbars() {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Мотоциклы</Nav.Link>
                        <Nav.Link href="link">Войти</Nav.Link>
                        <Nav.Link href="user">Профиль</Nav.Link>
                        <Nav.Link href="Reg">Регистрация</Nav.Link>
                        <Nav.Link href="Info">Контакты</Nav.Link>
                      
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;