import { rest } from "msw";
import { server } from "../../../mocks/server";
import { render } from "../../../test-utils";
import Type from "../Type";
import { screen } from "@testing-library/react";

test("display product images from server", async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole("img", {
    name: /product$/i,
  });

  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(["America product", "England product"]);
});

test("when fetching product data, face an error", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3001/products", (_, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});

test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  const optionsCheckboxes = await screen.findAllByRole("checkbox");
  expect(optionsCheckboxes).toHaveLength(2);
});
