const amqp = require('amqplib');
const axios = require('axios');

async function updateOrderStatus(orderId, status) {
    try {
        const response = await axios.post('http://commands:4001/update-status', {
            orderId,
            status
        });
        console.log('Order status updated:', response.data);
    } catch (error) {
        console.error('Failed to update order status:', error);
    }
}

async function startConsumer() {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'order_queue'; 

        await channel.assertQueue(queue, { durable: true });


        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const order = JSON.parse(msg.content.toString());
                const statusUpdates = ['Received', 'Processing', 'Shipped', 'Delivered'];
                for (let status of statusUpdates) {
                    await updateOrderStatus(order._id, status);
                    const randomDelay = Math.floor(Math.random() * 60 + 1) * 1000; 
                    await new Promise(resolve => setTimeout(resolve, randomDelay));
                }

                channel.ack(msg);

                console.log(`Order ${order._id} processing complete.`);
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Error starting consumer:', error);
    }
}

startConsumer();
