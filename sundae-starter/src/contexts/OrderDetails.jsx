import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// custom hook to check to see if we're in a provider
export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);

    if (!contextValue) {
        throw new Error('useOrderDetails must be called from within an OrderDetailsProvider');
    }

    return contextValue;
}

export function OrderDetailsProvider(props) {
    const initialStateObject = {
        scoops: {}, // example: { Chocolate: 1, Vanilla: 2 } - each scoop is 2$
        toppings: {}, // example: { "Gummi Bears": 1 } - each topping is 1.50$
    };
    const [optionCounts, setOptionCounts] = useState(initialStateObject);

    const updateItemCount = (itemName, newItemCount, optionType) => {
        // make a copy of existing state
        const newOptionCounts = { ...optionCounts };

        //update the copy with the new information
        newOptionCounts[optionType][itemName] = newItemCount;

        // update the actual state
        setOptionCounts(newOptionCounts);
    }

    const resetOrderFuntion = () => {
        setOptionCounts(initialStateObject);
    }

    // utility function to derive totals from optionCounts state value
    const calculateTotal = (optionType) => {
        // get an array of counts for the option type ( for example [1, 2] )
        const countsArray = Object.values(optionCounts[optionType]);

        // total the vaues in the array of counts
        const totalCount = countsArray.reduce((total, currentValue) =>
            total + currentValue, 0 // we start with the total of 0
        );

        // multiply the total number of items by the price for this item type
        return totalCount * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings"),
    }

    const value = { optionCounts, updateItemCount, resetOrderFuntion, totals };
    return <OrderDetails.Provider value={value} {...props} />;
}