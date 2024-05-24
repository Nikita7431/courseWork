import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../redux/Auth';


export function AuthWindows() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   // const dispatch = useDispatch(); 
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    let  counter =false;
   

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7014/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

              //  setIsLoggedIn(true);
                store.dispatch(login(data));
              
               // store.dispatch(s);
             //   store.dispatch({ type: 'auth/login', payload: isAuthenticated });
      
                
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }

       

    };
    counter = useSelector(state => state.auth.isLogin);
    return (
        <>
            {counter ? (
                <p>Вы прошли аутентификацию</p>
            ) : (
                <>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>{' '}
                </>
            )}
        </>
    );
}
 