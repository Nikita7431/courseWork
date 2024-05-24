import { useState } from "react";
import { Button, Form } from "react-bootstrap";
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

export function LoginForm() {

   
    const [loginPeople, setLoginPeople] = useState<LoginPeople>();

    const [Login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

   

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7244/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Login, password }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log({data});
                //  setIsLoggedIn(true);
                store.dispatch(login(data));
                

                //const response2 = await fetch('https://localhost:7244/api/Auth/loginPeople', {
                //    method: 'GET',
                //    headers: {
                //        'Content-Type': 'application/json',
                //    },
                   
                //});
                //const data2 = await response2.json();
                //console.log({ data2 });
                //store.dispatch(logPeople(data2));
              
               
               
                navigate('/user');
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
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="login" value={Login}  onChange={(e) => setLogin(e.target.value)} />
                <Form.Text className="text-muted">
                  Введите login
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          
            <Button variant="primary" onClick={handleLogin}>
                Login
            </Button>
        </Form>
    );
}


export default LoginForm;


