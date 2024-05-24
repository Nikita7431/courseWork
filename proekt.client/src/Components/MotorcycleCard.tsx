import React, { useState } from 'react';
/*import './/styles.css';*/

const MotorcycleCard = ({ motorcycle }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ phone: '', firstName: '', lastName: '' });

    const handleOrder = () => {
        
        console.log('Отправка данных на сервер:', formData);
        setFormData({ phone: '', firstName: '', lastName: '' });
      
        setModalOpen(false);
    
       
    };

    return (
        <div className="product-card" onClick={() => setModalOpen(true)}>
            <img src={motorcycle.image} alt={motorcycle.name} />
            <h2>{motorcycle.name}</h2>
            <p>{motorcycle.price}</p>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <h2>Oformlenie zakaza</h2>
                        <input type="text" placeholder="Number phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        <input type="text" placeholder="Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                        <input type="text" placeholder="Family" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                        <button onClick={handleOrder}>Buy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MotorcycleCard;