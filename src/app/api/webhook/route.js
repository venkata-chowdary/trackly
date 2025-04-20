export default function POST(request) {

    if (request.method === "POST") {
        const paymentData = request.body
        console.log(paymentData)

        try {
            if (paymentData.status === "Credit") {
                //save the log
                //update user's credits

                console.log('Payment Successful! Payment ID:', paymentData.payment_request_id);
                res.status(200).send('Webhook received and payment processed successfully');
            }
            else {
                console.log('Payment Failed or Canceled. Payment Status:', paymentData.payment_status);
                res.status(400).send('Payment Failed or Canceled');
            }
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}