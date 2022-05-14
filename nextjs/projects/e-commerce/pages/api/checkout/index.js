import graphql from '../../../lib/graphql';
import getProductDetailsById from '../../../lib/graphql/queries/getProductDetailsById';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const shipping_address_collection = {
          allowed_countries: ['IT', 'US'],
};


export const shipping_options = [
          {
                    shipping_rate_data: {
                              type: 'fixed_amount',

                              fixed_amount: {
                                        amount: 0,
                                        currency: 'EUR',
                              },

                              display_name: 'Free Shipping',

                              delivery_estimate: {
                                        minimum: {
                                                  unit: 'business_day',
                                                  value: 3,
                                        },

                                        maximum: {
                                                  unit: 'business_day',
                                                  value: 5,
                                        },
                              },
                    },
          },

          {
                    shipping_rate_data: {
                              type: 'fixed_amount',

                              fixed_amount: {
                                        amount: 499,
                                        currency: 'EUR',
                              },

                              display_name: 'Next day air',

                              delivery_estimate: {
                                        minimum: {
                                                  unit: 'business_day',
                                                  value: 1,
                                        },

                                        maximum: {
                                                  unit: 'business_day',
                                                  value: 1,
                                        },
                              },
                    },
          },
];


export default async function handler(req, res) {
          const { item } = req.body;

          const { product } = await graphql.request(getProductDetailsById, { ids: Object.keys(items)} )

          const line_items = products.map((product) => ({
                    // user can change the quantity during checkout
                    adjustable_quantity: {
                              enabled: true,
                              minimum: 1,
                    },

                    price_data: {
                    // of course, it can be any currency of your choice
                              currency: 'EUR',

                              product_data: {
                                        name: product.name,
                                        images: product.images.map((img) => img.url),
                              },

                    // please note that GraphCMS already returns the price in the
                    // format required by Strapi: €4.99, for instance, should be
                    // passed to Stripe as 499.
                              unit_amount: product.price,
                    },

                    quantity: items[product.id],
          }));

          const session = await stripe.checkout.sessions.create({
                    mode: 'payment', // can also be "subscription" or "setup"

                    line_items,

                    payment_method_types: ['card', 'sepa_debit'],
                    // the server doesn't know the current URL, so we need to write
                    // it into an environment variable depending on the current
                    // environment. Locally, it should be URL=http://localhost:3000

                    shipping_address_collection,
                    shipping_options,

                    success_url: `${process.env.URL}/success`,
                    cancel_url: `${process.env.URL}/cancel`,
          });

          res.status(201).json({ session });
}