import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from '../../utilities/index';
import Button from 'react-bootstrap/Button';

export default function OrderEntry({ changeOrderPhase }) {
    const { totals } = useOrderDetails();
    const grandTotal = formatCurrency(totals.scoops + totals.toppings);

    return (
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: {grandTotal}</h2>
            <Button onClick={() => changeOrderPhase('review')}>Order Sundae!</Button>
        </div>
    )
}