// app/pricing/page.tsx

"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
    const creditPlans = [
        { credits: 20, price: 9 },
        { credits: 50, price: 19 },
        { credits: 100, price: 35 },
    ]

    async function handleClick(price, credits) {
        try {
            const res = await fetch("/api/create-payment", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    purpose: `${credits} Credits`,
                    amount: price,
                    credits: credits
                })
            })

            const data = await res.json()
            if (data.success && data.longurl) {
                window.location.href = data.longurl;
            } else {
                console.error("Payment failed:", data);
                alert("Something went wrong while creating the payment.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4 text-foreground">Buy Credits</h1>
            <p className="text-muted-foreground mb-8">
                Use credits to unlock premium features like AI resume review, application insights, and more.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {creditPlans.map((plan, index) => (
                    <Card key={index} className="border">
                        <CardHeader>
                            <CardTitle className="text-lg">{plan.credits} Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-semibold mb-4">₹{plan.price}</p>
                            <Button className="w-full border border-input bg-background text-foreground hover:bg-muted" variant="outline" onClick={() => handleClick(plan.price, plan.credits)}>
                                Buy Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
