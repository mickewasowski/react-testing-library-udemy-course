import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useState } from 'react';

export default function ScoopOption({name, imagePath}) {
    const { updateItemCount } = useOrderDetails();
    const [isInvalidInput, setIsInvalidInput] = useState(false);

    const handleChange = (event) => {
        const currentInput = parseFloat(event.target.value);
        const valueIsValid = 0 <= currentInput && currentInput <= 10 &&
        Math.floor(currentInput) === currentInput;
        setIsInvalidInput(!valueIsValid);

        const newValue = valueIsValid ? parseInt(currentInput) : 0
        updateItemCount(name, newValue, "scoops")
    }

    return(
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center'}}>
            <img
                style={{ width: '75%' }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />
            <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
                <Form.Label column xs="6" style={{ textAlign: "right" }}>{name}</Form.Label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={isInvalidInput}
                    />
                </Col>
            </Form.Group>
        </Col>
    )
}