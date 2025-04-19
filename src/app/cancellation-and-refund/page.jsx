// app/cancellation-and-refund/page.tsx
export default function CancellationAndRefund() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Cancellation & Refund Policy</h1>
            <p className="mb-4">
                Once a payment is made for premium features or subscriptions, it is non-refundable.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do not offer partial or full refunds for any plan.</li>
                <li>If you experience technical issues, please reach out to us within 3 days for resolution.</li>
                <li>Cancellations can be made anytime but do not qualify for refunds.</li>
            </ul>
        </div>
    );
}
