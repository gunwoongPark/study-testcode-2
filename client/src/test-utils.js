import { render } from "@testing-library/react";
import OrderContextProvider from "./contexts/OrderContext";

const customRender = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

export { customRender as render };
