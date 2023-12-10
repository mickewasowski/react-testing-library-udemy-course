import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from '../../utilities/index';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

export default function OrderEntry({ changeOrderPhase }) {
    const [shouldDisableButton, setShouldisableButton] = useState(true);
    const { totals } = useOrderDetails();
    const grandTotal = formatCurrency(totals.scoops + totals.toppings);

    useEffect(() => {
        if (totals.scoops > 0) {
            setShouldisableButton(false);
        } else {
            setShouldisableButton(true);
        }
    }, [totals.scoops]);

    return (
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: {grandTotal}</h2>
            <Button onClick={() => changeOrderPhase('review')} disabled={shouldDisableButton}>Order Sundae!</Button>
        </div>
    )
}