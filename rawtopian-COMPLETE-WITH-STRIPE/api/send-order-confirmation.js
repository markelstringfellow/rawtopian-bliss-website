exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    
    // Format the order details for email
    const itemsList = orderData.items
      .map(item => `  - ${item.name} x ${item.quantity}`)
      .join('\n');

    const emailBody = `
New Order Received - Rawtopian Bliss

ORDER DETAILS:
--------------
Package: ${orderData.package}
Price: $${orderData.price}
Location: ${orderData.location}

CUSTOMER INFORMATION:
--------------------
Name: ${orderData.customer.name}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}
Delivery Address: ${orderData.customer.address}

ITEMS ORDERED:
-------------
${itemsList}

${orderData.comments ? `CUSTOMER COMMENTS:\n-----------------\n${orderData.comments}\n` : ''}

PAYMENT INFORMATION:
-------------------
Payment Intent ID: ${orderData.paymentIntentId}
Status: Paid

---
This order was placed through rawtopianbliss.org
    `.trim();

    // Option 1: Using SendGrid (if configured)
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: process.env.ORDER_EMAIL || 'orders@rawtopianbliss.org',
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@rawtopianbliss.org',
        subject: `New Order: ${orderData.package} - ${orderData.location}`,
        text: emailBody,
      };

      await sgMail.send(msg);
    }

    // Option 2: Log to console (for testing)
    console.log('Order received:', emailBody);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Order confirmation sent',
      }),
    };
  } catch (error) {
    console.error('Error sending order confirmation:', error);
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

