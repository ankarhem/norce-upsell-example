<script lang="ts">
  import { TrackingEvents } from "@norce/analytics";
  import { createFormatter } from "@norce/checkout-lib";
  import type { TranslationsFn } from "@norce/checkout-lib";
  import type { MountProps } from "@norce/module-adapter-svelte";
  import { addToCart, getProductsFromCatogory } from "./jetshop";
  import type translations from "./translations.json";

  export let api: MountProps["api"];
  export let data: MountProps["data"];
  export let track: MountProps["track"];
  export let t: TranslationsFn<keyof typeof translations>;

  const formatter = createFormatter(data.order.culture, data.order.currency);

  let productsPromise = getProductsFromCatogory({
    merchant: data.order.merchant,
    channel: data.order.channel,
    productId: data.order.cart?.items?.[0].attributes?.productId as any,
  }).then((res) => {
    const products = res?.data?.product?.categories?.[0]?.products?.result;

    return products || [];
  });

  /**
   * This is a minimal example and does not work for variants etc.
   **/
  const handleClick = (articleNumber: string) => {
    addToCart({
      cartId: data.order.cart?.reference,
      merchant: data.order.merchant,
      channel: data.order.channel,
      articleNumber: articleNumber,
    }).then(() => {
      api.updateCart();
    });
  };
</script>

{#await productsPromise then products}
  <div class="grid gap-4 text-sm justify-center text-base-content p-4">
    <h2 class="text-center text-xl">
      {t("You might also be interested in these products")}
    </h2>
    <ul class="grid grid-cols-2 sm:flex gap-4">
      {#each products as product}
        {#if !product?.hasVariants}
          <li
            class="grid gap-2"
            data-testid={`upsell-item-${product?.articleNumber}`}
          >
            <img
              src={product?.images?.[0]?.url}
              alt={product?.images?.[0]?.alt}
              class="w-48 h-48 object-contain"
            />
            <h3>{product?.name}</h3>
            <div class="flex justify-between">
              <span class="text-xs">
                {formatter.format(product?.price?.incVat)}
              </span>
              {#if product?.previousPrice?.incVat}
                <span class="text-xs line-through text-base-content/50">
                  {formatter.format(product?.previousPrice?.incVat)}
                </span>
              {/if}
            </div>
            <button
              data-testid="norce-upsell-add-to-cart"
              class="bg-primary text-primary-content rounded py-2"
              on:click={() => {
                handleClick(product?.articleNumber);
                track(TrackingEvents.AddToCart, {
                  items: [
                    {
                      item_id: product?.articleNumber,
                      item_name: product?.name,
                      price: product?.price?.incVat,
                      quantity: 1,
                    },
                  ],
                  currency: data.order.currency,
                  value: product.price?.incVat,
                });
              }}
            >
              {t("Add to cart")}
            </button>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
{/await}

<style global lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>
