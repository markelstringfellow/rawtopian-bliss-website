const Stripe = require('stripe');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { amount, orderDetails } = JSON.parse(event.body);

    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      metadata: {
        location: orderDetails.location,
        package: orderDetails.package,
        items: JSON.stringify(orderDetails.items),
        comments: orderDetails.comments || '',
        customerName: orderDetails.customer?.name || '',
        customerEmail: orderDetails.customer?.email || '',
        customerPhone: orderDetails.customer?.phone || '',
      },
      description: `Rawtopian Bliss - ${orderDetails.package} - ${orderDetails.location}`,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};

