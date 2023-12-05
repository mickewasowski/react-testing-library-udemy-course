import { useOrderDetails } from "../contexts/OrderDetails";
import Button from 'react-bootstrap/Button';

export default function OrderConfirmation({ changeOrderPhase }) {
    const { orderNumber, resetOrderFuntion } = useOrderDetails();

    const handleNewOrder = () => {
        resetOrderFuntion();
        changeOrderPhase('inProgress')
    };

    return(
        <div>
            <h1>Thank you!</h1>
            <h2>Your order number is {orderNumber}</h2>
            <p>as per our terms and conditions, nothing will happen now</p>
            <Button onClick={handleNewOrder}>Create new order</Button>
        </div>
    )
}
