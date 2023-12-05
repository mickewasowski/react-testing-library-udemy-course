import SummaryForm from './SummaryForm';
import { useOrderDetails } from "../contexts/OrderDetails";
import { formatCurrency } from "../utilities";

export default function OrderSummary({ changeOrderPhase }) {
    const { totals, optionCounts } = useOrderDetails();

    const scoopArray = Object.entries(optionCounts.scoops); // example: [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => {
        return <li key={key}>
            {value} {key}
        </li>
    });

    const toppingArray = Object.keys(optionCounts.toppings); // example: ["M&Ms", "Hot Fundge"]
    const toppingList = toppingArray.map((key) => {
        return <li key={key}>
            {key}
        </li>
    });

    const finalizeOrder = () => changeOrderPhase('complete');

    return(
        <div>
            <h1>OrderSummary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>
                {scoopList}
            </ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            <ul>
                {toppingList}
            </ul>
            <SummaryForm order={finalizeOrder}/>
        </div>
    )
}
