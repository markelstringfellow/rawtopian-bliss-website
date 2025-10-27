// This is a serverless function for sending order emails
// You'll need to set up environment variables in Netlify:
// - EMAIL_SERVICE (e.g., SendGrid, Mailgun, or SMTP)
// - EMAIL_API_KEY
// - OWNER_EMAIL (your email address)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orderData = req.body;

    // Email content
    const emailContent = `
      New Order Received - Rawtopian Bliss
      
      Order Details:
      --------------
      Location: ${orderData.location}
      Package: ${orderData.package} - $${orderData.price}
      
      Customer Information:
      ---------------------
      Name: ${orderData.customerName}
      Email: ${orderData.customerEmail}
      Phone: ${orderData.customerPhone}
      Delivery Address: ${orderData.customerAddress}
      
      Selected Items:
      ---------------
      ${orderData.items.map(item => `${item.name} x ${item.quantity}`).join('\n      ')}
      
      ${orderData.comments ? `Comments/Questions:\n${orderData.comments}` : ''}
      
      Total: $${orderData.price}
      
      ---
      This order was placed through rawtopianbliss.org
    `;

    // Here you would integrate with your email service
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: process.env.OWNER_EMAIL,
      from: 'orders@rawtopianbliss.org',
      subject: `New Order - ${orderData.package} - ${orderData.customerName}`,
      text: emailContent,
    });
    */

    // For now, we'll just log it and return success
    console.log('Order Email:', emailContent);

    return res.status(200).json({ 
      success: true, 
      message: 'Order received successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to process order',
      details: error.message 
    });
  }
}

