import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface Props {
    onLoginSuccess: () => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Здесь можете добавить логику проверки логина и пароля
        // Пока просто эмулируем успешный вход
        if (username === 'admin' && password === 'password') {
            onLoginSuccess();
        } else {
            alert('Неправильный логин или пароль');
        }
    };

    return (
        <div>
            <h2>Entery system</h2>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={handleLogin}>
                    Enter
                </Button>
            </Form>
        </div>
    );
};

export default Login;
