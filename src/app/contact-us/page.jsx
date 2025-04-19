// app/contact-us/page.tsx
export default function ContactUs() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
            <p className="mb-4">
                Have questions, feedback, or facing issues? Reach out to us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Email: chowdaryimmanni@gmail.com</li>
                <li>Phone: +91 9492092444</li>
                <li>Support hours: Mon - Fri, 10 AM – 6 PM IST</li>
            </ul>
        </div>
    );
}
