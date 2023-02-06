import { logger } from '@norce/checkout-lib';

const query = `
query getProducts($id: Int){
  product(id: $id) {
    categories {
      products {
        result {
          articleNumber
          hasVariants
          name
          price {
            incVat
          }
          previousPrice {
            incVat
          }
          images(limit:1) {
            alt
            title
            url
            modifiedDate
          }
          variants {
            options {
              name
              values
            }
            values {
              articleNumber
              
              values
              images {
                alt
                title
                url
              }
              price {
                incVat
              }
              previousPrice {
                incVat
              }
              
            }
          }
        }
      }
    }
  }
}
`;

export function getProductsFromCatogory({
  merchant,
  channel,
  productId,
}: {
  merchant: string;
  channel: string;
  productId: number;
}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    shopid: merchant,
    channelid: channel,
    token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
  });

  return fetch('https://storeapi.jetshop.io', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: query,
      variables: {
        id: productId,
      },
    }),
  })
    .then((r) => r.json())
    .catch((err) => {
      logger.error({
        label: 'JetshopRequest',
        message: err?.message || 'Something went wrong',
      });
    });
}

const mutation = `
mutation addToCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    cart {
      id
    }
  }
}
`;

export function addToCart({
  cartId,
  merchant,
  channel,
  articleNumber,
}: {
  cartId: string;
  merchant: string;
  channel: string;
  articleNumber: string;
}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    shopid: merchant,
    channelid: channel,
    token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
  });

  return fetch('https://storeapi.jetshop.io', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          cartId: cartId,
          articleNumber: articleNumber,
        },
      },
    }),
  })
    .then((r) => r.json())
    .catch((err) => {
      logger.error({
        label: 'JetshopRequest',
        message: err?.message || 'Something went wrong',
      });
    });
}
