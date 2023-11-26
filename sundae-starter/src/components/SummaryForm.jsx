import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SummaryForm() {
    const [isChecked, setIsChecked] = useState(false);

    return(
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    id="terms&condintions"
                    name="terms-and-conditions"
                    value={isChecked} 
                    onClick={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms&condintions">I agree to Terms and Conditions</label>
            </Form.Group>
            <Button type="submit" disabled={!isChecked}>Confirm order</Button>
        </Form>
    );
}

export default SummaryForm;