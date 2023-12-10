import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function SummaryForm() {
    const [isChecked, setIsChecked] = useState(false);

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
            <Button type="submit" disabled={!isChecked}>Confirm order</Button>
        </Form>
    );
}

export default SummaryForm;