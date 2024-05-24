import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const RewriteModal = ({ show, handleClose, motorcycle}) => {

/*export function RewriteModal() {*/
  /*  const [show, setShow] = useState(false);*/

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const [Id, setId] = useState('');
    const [Price, setPrice] = useState('');
    const [Name, setName] = useState('');
    const [Text1, setText] = useState('');

    const [Image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (motorcycle) {
            setId(motorcycle.idMotorcycle);
            setPrice(motorcycle.price);
            setName(motorcycle.name);
            setText(motorcycle.text);
        }
    }, [motorcycle]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };


    const handleLogin = async () => {

        const formData = new FormData();
        formData.append('Id', Id);
        formData.append('Name', Name);
        formData.append('Price', Price);
        formData.append('Text', Text1);

        if (Image) {

            formData.append('Image', Image);
        }

        /*try {*/


        //if (Image) {
        //    const formData = new FormData();
        //    formData.append('file', Image);

        //    // Отправляем запрос на сохранение файла
        //    fetch('/public/images', {
        //        method: 'POST',
        //        body: formData
        //    })
        //}



        const response = await fetch('https://localhost:7244/api/Motorcycle/UpdateMoto', {
            method: 'POST',
            body: formData,
        });

        //if (response.ok) {
        //    const data = await response.json();

        //    console.log({ data });

        //}
        //} catch (error) {
        //    console.error('Error during authentication:', error);
        //}



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
                                autoFocus
                                defaultValue={motorcycle?.idMotorcycle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название</Form.Label>
                            <Form.Control value={Name} onChange={(e) => setName(e.target.value)}
                                type="email"
                                placeholder=""
                                autoFocus
                                defaultValue={motorcycle?.name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control value={Price} onChange={(e) => setPrice(e.target.value)}
                                type="email"
                                placeholder=""
                                autoFocus
                                defaultValue={motorcycle?.price}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Текст</Form.Label>
                            <Form.Control as="textarea" rows={3} value={Text1} defaultValue={motorcycle?.text} onChange={(e) => setText(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Фото</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
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

export default RewriteModal;