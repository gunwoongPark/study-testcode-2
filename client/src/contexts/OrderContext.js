import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

const calculateSubTotal = (orderType, orderCounts) => {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
};

const OrderContextProvider = (props) => {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const resetOrderData = () => {
    setOrderCounts({
      products: new Map(),
      options: new Map(),
    });
  };

  useEffect(() => {
    const productsTotal = calculateSubTotal("products", orderCounts);
    const optionsTotal = calculateSubTotal("options", orderCounts);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, orderType) => {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    };

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderData];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
};

export default OrderContextProvider;
