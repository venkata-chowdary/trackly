// app/privacy-policy/page.tsx
export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our Job Application Tracker.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We collect information like email, name, and job data only to enhance your experience.</li>
                <li>Your data is stored securely and never shared with third parties without consent.</li>
                <li>We do not access your emails without explicit permission.</li>
                <li>You can revoke access at any time from your account settings.</li>
            </ul>
            <p>By using our service, you agree to this Privacy Policy.</p>
        </div>
    );
}
