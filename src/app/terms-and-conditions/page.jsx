// app/terms-and-conditions/page.tsx
export default function TermsAndConditions() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>
            <p className="mb-4">
                These Terms govern your use of our Job Application Tracker. By accessing or using the app, you agree to be bound by these Terms.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must be at least 13 years old to use the service.</li>
                <li>Do not misuse or attempt to disrupt the platform.</li>
                <li>We may suspend or terminate your access for violations of these terms.</li>
                <li>Subscription fees (if any) are non-refundable once processed.</li>
            </ul>
        </div>
    );
}
