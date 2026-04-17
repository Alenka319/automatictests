import sendEmail from './emailService.js'

function processOrder(order, userEmail) {
    if (order.total <= 0) {
      throw new Error('Invalid order total');
    }
    const message = `Order ${order.id} confirmed. Total: $${order.total}`;
    sendEmail(userEmail, 'Order Confirmation', message);
    return { success: true, message };
  }

export default processOrder
