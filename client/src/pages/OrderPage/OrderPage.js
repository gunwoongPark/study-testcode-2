import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "../OrderPage/Type";

const OrderPage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);

  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>

      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div>
          <h2>Total Price: {orderData.totals.total}</h2>
          <br />
          <button onClick={() => setStep(1)}>주문</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
