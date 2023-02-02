import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";

const CompletePage = ({ setStep }) => {
  const [orderData, _, resetOrderData] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/order",
        orderData
      );

      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.orderPrice}</td>
    </tr>
  ));

  const handleClick = () => {
    resetOrderData();
    setStep(0);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>주문이 성공했습니다.</h2>
      <h3>지금까지 모든 주문</h3>
      <table style={{ margin: "auto" }}>
        <tbody>
          <tr>
            <th>주문 번호</th>
            <th>주문 가격</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <button onClick={handleClick}>첫페이지로</button>
    </div>
  );
};

export default CompletePage;
