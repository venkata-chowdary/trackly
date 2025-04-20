export default async function POST(request) {

    const { purpose, amount, buyer_name, email, userId } = await request.json()
    try {

        const response = await fetch('https://www.instamojo.com/api/1.1/payment-requests/', {
            headers: {
                'X-Api-Key': process.env.INSTAMOJO_API_KEY,
                'X-Auth-Token': process.env.INSTAMOJO_AUTH_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "POST",
            body: new URLSearchParams({
                purpose: purpose,
                amount: amount,
                buyer_name: buyer_name,
                redirect_url: process.env.INSTAMOJO_REDIRECT_URL,
                send_email: true,
                webhook: `${process.env.WEBSITE_URL}/webhook/?userId=${userId}`,
                email: email,
                allow_repeated_payments: false,
            })
        })


        const data = await response.json()
        if (data.success) {
            return new Response(JSON.stringify(data), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Payment request failed", data }), { status: 400 });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
}