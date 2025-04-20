"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentRedirectPage() {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState(null)

    useEffect(() => {
        const payment_status = searchParams.get("payment_status")
        setPaymentStatus(paymentStatus)
        if (payment_status === 'Credit') {
            console.log('Payment Successful!');
        } else {
            console.log('Payment Failed or Canceled!');
        }
    }, [searchParams]);

    if(paymentStatus===null){
        return <p>Loading...</p>
    }
    return (
        <div>
            {paymentStatus === 'Credit' ? (
                <div>
                    <h2>Payment Successful! Thank you for your purchase.</h2>
                    <Link href={"/dashboard"}>Go To Dashboard</Link>
                </div>
            ) : (
                <div>
                    <h2>Payment Failed or Canceled. Please try again.</h2>
                    <Link href={"/pricing"}>Go To Pricing</Link>
                </div>
            )}
        </div>
    );
}