import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Row, Button, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchData, logPeople } from '../redux/Auth';


interface LoginPeople {
    id: number;
    name: string;
    login: string;
    password: string;
    phone: string;
    adress: string;
    email: string;
    job_title: string;
}

export function Profile() {

    const test = "Nikita";

    const [formData, setFormData] = useState<LoginPeople>({
        id: 0,
        name: '',
        login: '',
        password: '',
        phone: '',
        adress: '',
        email: '',
        job_title: ''
    });




    const [validated, setValidated] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.auth.Token); 

    const user = useSelector((state: RootState) => state.auth.User);
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const error = useSelector((state: RootState) => state.auth.error);



    const [idUser, setId] = useState(user?.id);
    const [Name, setName] = useState(user?.name);
    const [Login, setLogin] = useState(user?.login);
    const [Password, setPassword] = useState(user?.password);
    const [Phone, setPhone] = useState(user?.phone);
    const [Job_title, setJob_title] = useState(user?.job_title);
    const [Adress, setAdress] = useState(user?.adress);
    const [Email, setEmail] = useState(user?.email);




    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   
   

    useEffect(() => {
        if (user==null) {
            dispatch(fetchData());
        }
  
    }, [dispatch]);

    useEffect(() => {
        if (user!=null) {
            setFormData(user);
             setId(user?.id);
             setName(user?.name);
           setLogin(user?.login);
           setPassword(user?.password);
           setPhone(user?.phone);
           setJob_title(user?.job_title);
            setAdress(user?.adress);
            setEmail(user?.email);
        }
    }, [user]);

    useEffect(() => {
        if (formData.job_title !== '') {
            dispatch(logPeople(formData.job_title));
        }
    }, [formData]);
    

    if (userStatus === 'loading') {
        return <div>Loading</div>;
    }

    if (userStatus === 'failed') {
        return <div>Error loading user data: {error}</div>;
    }
    console.log({ user });


    //const [idUser, setId] = useState(0);
    //const [Name, setName] = useState('');
    //const [Login, setLogin] = useState('');
    //const [Password, setPassword] = useState('');
    //const [Phone, setPhone] = useState('');
    //const [Job_title, setJob_title] = useState('user');
    //const [Adress, setAdress] = useState('');
    //const [Email, setEmail] = useState('');

    

  

    const handleLogin = async () => {
        console.log({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title });
        try {
            const response = await fetch('https://localhost:7244/api/Auth/UpLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title }),
            });

            //if (response.ok) {
            //    const data = await response.json();

            //    console.log({ data });
             
            //} else {
            //    console.error('Authentication failed');
            //}
        } catch (error) {
            console.error('Error during authentication:', error);
        }



    };
    const handleDelLogin = async () => {
        console.log({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title });
        try {
            const response = await fetch('https://localhost:7244/api/Auth/DelLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log({ idUser, Name, Login, Password, Phone, Adress, Email, Job_title });

            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }



    };





    if (user != null) {

        //setId(user?.id);
        //setName(user?.name);
        //setLogin(user?.login);
        //setPassword(user?.password);
        //setPhone(user?.phone);
        //setJob_title(user?.job_title);
        //setAdress(user?.adress);
        //setEmail(user?.email);

        const user2 = formData ;
        console.log({ user2});
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
                    <Form.Control type="email" value={Adress} onChange={(e) => setAdress(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="text"  value={Phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                {/*<Button variant="primary" onClick={handleLogin}>*/}
                {/*    Изменить*/}
                {/*</Button>*/}
                {/*<Button variant="primary" onClick={handleDelLogin}>*/}
                {/*    Удалить*/}
                {/*</Button>*/}
            </Form>
            
        );
    }
}

export default Profile;