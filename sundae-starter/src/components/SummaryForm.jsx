import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from "axios";
import { useOrderDetails } from "../contexts/OrderDetails";

function SummaryForm({ order }) {
    const [isChecked, setIsChecked] = useState(false);
    const { updateOrderNumber } = useOrderDetails();

    const popover = (
        <Popover id="popover">
          <Popover.Body>No ice cream will actually be delivered</Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        //the default value of the trigger property is mouseover
        <span>I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: "blue" }}> Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    )

    const handleOrder = async (event) => {
        event.preventDefault();
        
        axios.post(`http://localhost:3030/order`, {  })
            .then(response => {
                updateOrderNumber(response.data.orderNumber);
                order();
            })
            .catch((error) => {
                if (error.name !== 'CanceledError') {
                    console.log(error);
                }
            });
    }

    return(
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={isChecked} 
                    onClick={() => setIsChecked(!isChecked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button type="submit" disabled={!isChecked} onClick={handleOrder}>Confirm order</Button>
        </Form>
    );
}

export default SummaryForm;