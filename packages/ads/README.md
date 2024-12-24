# Installation

## NPM

Install `@corca-ai/ads` with your package manager.

```bash
yarn add @corca-ai/ads
```

```bash
npm install @corca-ai/ads
```

```bash
pnpm add @corca-ai/ads
```

# Usage

### Initialize CorcaAds

Initialize the class `CorcaAds` with your `storeId` and `customerId`.
You can find `storeId` in the [account management page](https://ads.corca.dev/store/account/management).


```js
import { CorcaAds } from "@corca-ai/ads";

const corcaAds = new CorcaAds({ storeId: "...", customerId: "..." });
```

### Set Customer ID

You can set `customerId` to track the user's behavior.

```js
corcaAds.setCustomerId("...");
```

## Log Collection

### Page view

```js
await corcaAds.onPageView({ productId: "1234" });
```


### Add to cart

```js
await corcaAds.onAddToCart({ productId: "1234", quantity: 1 });
```


### Purchase

```js
await corcaAds.onPurchase({
  orderId: "20231114010101",
  amount: 29900,
  items: [
    { productId: "1234", quantity: 1 },
  ],
});
```

### Example

```jsx
import { corcaAds } from "@corca-ai/ads";

const useCorcaAds = () => {
  const [corcaAds, setCorcaAds] = useState<CorcaAds>();
  const { me } = useFetchMe();

  useEffect(() => {
    const corcaAds = new CorcaAds({ storeId: "..." });
    setCorcaAds(corcaAds);
  }, []);

  useEffect(() => {
    if (corcaAds && me) {
      corcaAds.setCustomerId(me?.id);
    }
  }, [corcaAds, me]);

  return corcaAds;
};

export function ProductDetailPage(props: { params: { productId: string } }) {
  const corcaAds = useCorcaAds();

  useEffect(() => {
    if (corcaAds) {
      corcaAds.onPageView({ productId: props.params.productId });
    }
  }, [corcaAds]);

  return (
    <div>
      ...
    </div>
  );
}
```
