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

    const hasToppings = totals.toppings > 0;
    let toppingsDisplay = null;

    if (hasToppings) {
        const toppingArray = Object.keys(optionCounts.toppings); // example: ["M&Ms", "Hot Fundge"]
        const toppingList = toppingArray.map((key) => {
            return <li key={key}>
                {key}
            </li>
        });

        toppingsDisplay = (
            <>
                <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
                <ul>
                    {toppingList}
                </ul>
            </>
        )
    }


    const finalizeOrder = () => changeOrderPhase('complete');

    return(
        <div>
            <h1>OrderSummary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>
                {scoopList}
            </ul>
            { toppingsDisplay }
            <SummaryForm order={finalizeOrder}/>
        </div>
    )
}
