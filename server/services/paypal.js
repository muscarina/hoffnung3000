import paypal from 'paypal-rest-sdk'

import { getConfig } from '../config'

function extractLink(links, key) {
  for (let i = 0; i < links.length; i += 1) {
    if (links[i].rel === key) {
      return links[i].href
    }
  }

  return ''
}

export function createPayment(product) {
  const { name, description, price } = product

  paypal.configure({
    mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET,
  })

  return new Promise((resolve, reject) => {
    getConfig('currency')
      .then(config => {
        const items = [{
          name,
          description,
          price,
          quantity: 1,
          currency: config.currency,
        }]

        const paymentDetails = {
          intent: 'sale',
          payer: {
            payment_method: 'paypal',
          },
          redirect_urls: {
            return_url: process.env.PAYPAL_RETURN_URL,
            cancel_url: process.env.PAYPAL_CANCEL_URL,
          },
          transactions: [{
            description: name,
            amount: {
              currency: config.currency,
              total: price,
            },
            item_list: {
              items,
            },
          }],
        }

        paypal.payment.create(paymentDetails, (err, payment) => {
          if (err) {
            return reject(err)
          }

          return resolve({
            redirect: extractLink(payment.links, 'approval_url'),
            payment,
          })
        })
      })
  })
}

export function executePayment(paymentId, payerId) {
  const paymentDetails = { payer_id: payerId }

  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, paymentDetails, (err, payment) => {
      if (err) {
        return reject(err)
      }

      return resolve(payment)
    })
  })
}
