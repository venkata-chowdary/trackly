"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const { payment_request_id, payment_status } = router.query;

        if (payment_status === 'Credit') {
            console.log('Payment Successful!');
        } else {
            console.log('Payment Failed or Canceled!');
        }
    }, [router.query]);

    return (
        <div>
            {router.query.payment_status === 'Credit' ? (
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