import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function ToppingOption({ name, imagePath }) {
    const { updateItemCount } = useOrderDetails();

    // call updateItemCount with 1 if the checkbox is on or 0 if the checkbox is off
    //onChange handler to apply the above
    const handleChange = (event) => {
        updateItemCount(name, event.target.checked ? 1 : 0, 'toppings');
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center'}}>
            <img style={{ width: '75%' }} alt={`${name} topping`} src={`http://localhost:3030/${imagePath}`} />
            <Form.Group controlId={`${name}-topping-count`}>
                <Form.Check
                    type="checkbox"
                    onChange={handleChange}
                    label={name}
                />
            </Form.Group>
        </Col>
    )
}