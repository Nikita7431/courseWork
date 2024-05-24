//import '../styles.css';

//import MotorcycleCard from './MotorcycleCard';
//import Login from './Login';
import { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchData } from '../redux/Auth';
import RewriteModal from './RewriteModal';
import DeleteModal from './DeleteModal';
import WriteModal from './WriteModal';
import { useNavigate } from 'react-router-dom';




interface Motorcycle {
    idMotorcycle: number;
    name: string;
    price: string;
    text: string;
    image: string;
}


  


const FetchMotoCard = () => {

    const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle>(null);

    const [showWriteModal, setShowWriteModal] = useState(false);
    const handleShowWriteModal = (motorcycle: Motorcycle) => {
        setSelectedMotorcycle(motorcycle); setShowWriteModal(true);
    }
    const handleCloseWriteModal = () => setShowWriteModal(false);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleShowDeleteModal = (motorcycle: Motorcycle) => { setSelectedMotorcycle(motorcycle); setShowDeleteModal(true); }
    const handleCloseDeleteModal = () => setShowDeleteModal(false);



    const [showModal, setShowModal] = useState(false);
    const handleShowModal = (motorcycle: Motorcycle) => {
        setSelectedMotorcycle(motorcycle); setShowModal(true);
    }
    const handleCloseModal = () => setShowModal(false);
    
    const navigate = useNavigate();


    const handleBookingList = async () => { navigate('/Booking'); }
   
    //const handleOpenRewriteModal = () => {

    //    RewriteModal();
    //};


    
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.User);
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const error = useSelector((state: RootState) => state.auth.error);
   

    const [ia, seIa] = useState<string>('');
    /*const isAdmin = useSelector((state: RootState) => state.auth.isAdmin, shallowEqual);*/
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

    const FetchMotoBooking = async (motorcycle) => {
        const formData = new FormData();
        formData.append('Id', motorcycle.idMotorcycle);
        formData.append('Name', motorcycle.name);
        formData.append('Price', motorcycle.price);
        formData.append('Text', motorcycle.text);
        if (user) {
            formData.append('IdP', user.id.toString());
            formData.append('NameP', user.name);
            formData.append('EmailP', user.email);
            formData.append('PhoneP', user.phone);
            formData.append('AdressP', user.adress);
        }
        const response = await fetch('https://localhost:7244/api/Values/NewBooking', {
            method: 'POST',
            body: formData,
        });
    }

    useEffect(() => {
       
            fetch('https://localhost:7244/api/Motorcycle')
                .then(response => response.json())
                .then(data => setMotorcycles(data))
                .catch(error => console.error('Ошибка при получении мотоциклов:', error));
          
        
       
    }, []);
    useEffect(() => {
        if (user == null) {
            dispatch(fetchData());
        }

    }, [dispatch]);

    useEffect(() => {
        if (user != null) {
            seIa(user.job_title);

        }
    }, [user]);
    //const handleCardClick = (motorcycle: Motorcycle) => {
    //    console.log('Выбран мотоцикл:', motorcycle);
    //};

    //// Функция для обработки успешной аутентификации
    //const handleLoginSuccess = () => {
    //    setIsLoggedIn(true); // Устанавливаем статус входа в true после успешной аутентификации
    //};

    // Если пользователь не вошел в систему, показываем страницу входа
    //if (!isLoggedIn) {
    //    return (
    //        <Login onLoginSuccess={handleLoginSuccess} />
    //    );
    //}

    //useEffect(() => {
    //    console.log('isAdmin changed:', isAdmin);
    //}, [isAdmin]);

    if (userStatus === 'loading') {
        return <div>Loading</div>;
    }

    if (userStatus === 'failed') {
        return <div>Error loading user data: {error}</div>;
    }
    console.log({ ia });
    if (ia == "admin") {
    return (
      
        <>
            <header>
                <Button variant="primary" onClick={handleBookingList} >Заказы</Button>
            </header>
            <section id="products">
              
                <Container>
                    <Row>
                        {motorcycles.map((motorcycle, index) => (

                            <Col md={4} key={index} className="mb-4">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={motorcycle.image} />
                                    <Card.Body>
                                        <Card.Title>{motorcycle.name}</Card.Title>
                                        <Card.Text>
                                            <p>{motorcycle.idMotorcycle}</p>
                                            <p>Цена: {motorcycle.price}</p>
                                            Описание: {motorcycle.text }
                                        </Card.Text>
                                          <Button variant="primary" onClick={() => handleShowWriteModal(motorcycle)}>Добавить</Button>
                                        <Button variant="success" onClick={() => handleShowModal(motorcycle)} >Изменить</Button>
                                        <Button variant="danger" onClick={() => handleShowDeleteModal(motorcycle)} >Удалить</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>


                {/*//<MotorcycleCard*/}
                {/*//    key={motorcycle.name}*/}
                {/*//    motorcycle={motorcycle}*/}
                {/*////  onClick={() => handleCardClick(motorcycle)}*/}
                {/*///>*/}

            </section>

            <RewriteModal show={showModal} handleClose={handleCloseModal} motorcycle={selectedMotorcycle} />
            <DeleteModal show={showDeleteModal} handleClose={handleCloseDeleteModal} motorcycle={selectedMotorcycle} />
            <WriteModal show={showWriteModal} handleClose={handleCloseWriteModal} motorcycle={selectedMotorcycle} />

            <footer>
                <p>&copy; 2024 Honda motorcycle</p>
            </footer>
        </>
        );
    }
    else {
        return (

            <>


                <section id="products">

                    <Container>
                        <Row>
                            {motorcycles.map((motorcycle, index) => (
                                <Col md={4} key={index} className="mb-4">
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={motorcycle.image} />
                                        <Card.Body>
                                            <Card.Title>{motorcycle.name}</Card.Title>
                                            <Card.Text>
                                                <p>{motorcycle.idMotorcycle}</p>
                                                <p>Цена: {motorcycle.price}</p>
                                               Описание: {motorcycle.text}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => FetchMotoBooking(motorcycle)}>Забронировать</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    {/*//<MotorcycleCard*/}
                    {/*//    key={motorcycle.name}*/}
                    {/*//    motorcycle={motorcycle}*/}
                    {/*////  onClick={() => handleCardClick(motorcycle)}*/}
                    {/*///>*/}

                </section>
                <footer>
                    <p>&copy; 2024 Honda motorcycle</p>
                </footer>
            </>
        );

    }
}

export default FetchMotoCard;


