import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const DeleteModal = ({ show, handleClose, motorcycle }) => {

    /*export function RewriteModal() {*/
    /*  const [show, setShow] = useState(false);*/

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const [Id, setId] = useState('');
    const [Price, setPrice] = useState('');
    const [Name, setName] = useState('');
    const [Text, setText] = useState('');

    useEffect(() => {
        if (motorcycle) {
            setId(motorcycle.idMotorcycle);
            setPrice(motorcycle.price);
            setName(motorcycle.name);
            setText(motorcycle.text);
        }
    }, [motorcycle]);

    const handleLogin = async () => {
        try {
            console.log(Id);
            const response = await fetch('https://localhost:7244/api/Motorcycle/DeleteMoto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               
                body: JSON.stringify({ Id, Name, Price, Text }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log({ data });
                handleClose();
            }
        } catch (error) {
            console.error('Error Delete:', error);
        }



    };




    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id</Form.Label>
                            <Form.Control value={Id} onChange={(e) => setId(e.target.value)}
                                type="email"
                                placeholder=""
                                defaultValue={Id}
                                autoFocus
                            />
                        </Form.Group>
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;