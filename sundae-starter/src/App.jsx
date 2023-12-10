import Container from 'react-bootstrap/Container';
import OrderEntry from './components/entry/OrderEntry';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';

function App() {
  const [ orderState, setOrderState ] = useState('inProgress');

  let OrderPhaseComponent = "";
  switch(orderState) {
    case `inProgress`:
      OrderPhaseComponent = OrderEntry;
        break;
      case `review`:
        OrderPhaseComponent = OrderSummary;
        break;
      case `complete`:
        OrderPhaseComponent = OrderConfirmation;
        break;
      default:
        break;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <OrderPhaseComponent changeOrderPhase={setOrderState} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
