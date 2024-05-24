import { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchData } from '../redux/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

interface LoginPeople {
    id: number;
    name: string;
    Login: string;
    Password: string;
    phone: string;
    Adress: string;
    email: string;
    Job_title: string;
}

interface Motorcycle {
    idMotorcycle: number;
    name: string;
    price: string;
    text: string;
    image: string;
}

interface Booking {
    idBooking: number;
    regPeopleModel: LoginPeople;
    motorcycle: Motorcycle;
}

function BookingList() {

    const [bookings, setBookings] = useState<Booking[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const [uId, setUid] = useState(0);       
    const user = useSelector((state: RootState) => state.auth.User);
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const error = useSelector((state: RootState) => state.auth.error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7244/api/Values');
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Ошибка при получении данных бронирования:', error);
            }
        };

        fetchData();
    }, []);

    //useEffect(() => {
    //    if (user == null) {
    //        dispatch(fetchData());
    //        setUid(user?.id);
    //    }

    //}, [dispatch]);

    const FetchMotoBooking = async (motorcycle) => {
        const formData = new FormData();
        //if (uId != 0) {
        //    formData.append('idUser', uId);
        //}
        formData.append('idMoto', motorcycle.idMotorcycle);
        



        const response = await fetch('https://localhost:7244/api/Values/DelBooking', {
            method: 'POST',
            body: formData,
        });
    }


    if (userStatus === 'loading') {
        return <div>Loading</div>;
    }

    if (userStatus === 'failed') {
        return <div>Error loading user data: {error}</div>;
    }

    console.log(bookings);

    return (
        
        <ListGroup as="ol" numbered>
            {bookings.map((booking, index) => (
                <Col md={4} key={index} className="mb-4">
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {booking.motorcycle.idMotorcycle}: {booking.motorcycle.name} - {booking.motorcycle.price}
                            </div>
                            {booking.regPeopleModel.id}: {booking.regPeopleModel.name}, {booking.regPeopleModel.email}, {booking.regPeopleModel.phone}
                        </div>
                        <Button variant="danger" onClick={() => FetchMotoBooking(booking.motorcycle)} >Удалить</Button>
                    </ListGroup.Item>
                </Col>
            ))}
        </ListGroup>
    );
}

export default BookingList;

