import { useEffect, useState } from "react";
import { useOrderDetails } from "../contexts/OrderDetails";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";

export default function OrderConfirmation({ changeOrderPhase }) {
    const { resetOrderFuntion } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            axios.post(`http://localhost:3030/order`, {  })
                .then(response => {
                    setOrderNumber(response.data.orderNumber);
                    setIsLoading(false);
                })
                .catch((error) => {
                    if (error.name !== 'CanceledError') {
                        console.log(error);
                    }
                    setIsLoading(false);
                });
        }, 400);
    }, []);

    const handleNewOrder = () => {
        resetOrderFuntion();
        changeOrderPhase('inProgress')
    };

    return(
        <>
            {
                isLoading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <div>
                    <h1>Thank you!</h1>
                    <h2>Your order number is {orderNumber}</h2>
                    <p>as per our terms and conditions, nothing will happen now</p>
                    <Button onClick={handleNewOrder}>Create new order</Button>
                </div>
            }
        </>
    )
}
