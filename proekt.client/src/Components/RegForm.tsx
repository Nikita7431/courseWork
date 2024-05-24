import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { login, logPeople } from "../redux/Auth";
import { store } from '../redux/store';

import { useNavigate } from "react-router-dom";

interface LoginPeople {
    Id: number;
    Name: string;
    Login: string;
    Password: string;
    Phone: string;
    Adress: string;
    Email: string;
    Job_title: string;
}

export function RegForm() {

    const [validated, setValidated] = useState(false);

    const [loginPeople, setLoginPeople] = useState<LoginPeople>();


    const [idUser, setId] = useState(0);
    const [Name, setName] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Phone, setPhone] = useState('');
    const [Job_title, setJob_title] = useState('user');
    const [Adress, setAdress] = useState('');
    const [Email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            handleLogin();
        }
        handleLogin();
        setValidated(true);
    };

    const handleLogin = async () => {
        console.log({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title });
        try {
            const response = await fetch('https://localhost:7244/api/Auth/newLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log({ data });
                //  setIsLoggedIn(true);
             


                //const response2 = await fetch('https://localhost:7244/api/Auth/loginPeople', {
                //    method: 'GET',
                //    headers: {
                //        'Content-Type': 'application/json',
                //    },

                //});
                //const data2 = await response2.json();
                //console.log({ data2 });
                //store.dispatch(logPeople(data2));



                navigate('/link');
                // store.dispatch(s);
                //   store.dispatch({ type: 'auth/login', payload: isAuthenticated });


            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }



    };
    /*    counter = useSelector(state => state.auth.isLogin);*/


    return (

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login</Form.Label>
                <Form.Control type="email"  value={Login} onChange={(e) => setLogin(e.target.value)} />
                <Form.Text className="text-muted">
                    Введите login
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="email"  value={Password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="email"  value={Name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"  value={Email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Адрес</Form.Label>
                <Form.Control type="email"  value={Adress} onChange={(e) => setAdress(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Телефон</Form.Label>
                <Form.Control type="text"  value={Phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
                Зарегистрироваться
            </Button>
        </Form> 
    );
}

export default RegForm;


