# Installation

## NPM

Install `@corca-ai/data-core` with your package manager.

```bash
yarn add @corca-ai/data-core
```

```bash
npm install @corca-ai/data-core
```

```bash
pnpm add @corca-ai/data-core
```

# Usage

### Initialize CorcaData

Initialize the class `CorcaData` with your `storeId` and `customerId`.
You can find `storeId` in the [account management page](https://ads.corca.dev/store/account/management).


```js
import { CorcaData } from "@corca-ai/data-core";

const corcaData = new CorcaData({ storeId: "...", customerId: "..." });
```

### Set Customer ID

You can set `customerId` to track the user's behavior.

```js
corcaData.setCustomerId("...");
```

## Log Collection

### Page view

```js
await corcaData.onPageView({ productId: "1234" });
```


### Add to cart

```js
await corcaData.onAddToCart({ productId: "1234", quantity: 1 });
```


### Purchase

```js
await corcaData.onPurchase({
  orderId: "20231114010101",
  amount: 29900,
  items: [
    { productId: "1234", quantity: 1 },
  ],
});
```

### Example

```jsx
import { CorcaData } from "@corca-ai/data-core";

const useCorcaData = () => {
  const [corcaData, setCorcaData] = useState<CorcaData>();
  const { me } = useFetchMe();

  useEffect(() => {
    const corcaData = new CorcaData({ storeId: "..." });
    setCorcaData(corcaData);
  }, []);

  useEffect(() => {
    if (corcaData && me) {
      corcaData.setCustomerId(me?.id);
    }
  }, [corcaData, me]);

  return corcaData;
};

export function ProductDetailPage(props: { params: { productId: string } }) {
  const corcaData = useCorcaData();

  useEffect(() => {
    if (corcaData) {
      corcaData.onPageView({ productId: props.params.productId });
    }
  }, [corcaData]);

  return (
    <div>
      ...
    </div>
  );
}
```
