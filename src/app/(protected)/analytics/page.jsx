"use client";

import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {


    async function handleClick() {
        try {
            const res = await fetch("/api/getEmailData");
            const data = await res.json();
            // alert(data.message)
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    }

    return (
        <section>
            <Button onClick={handleClick}>Click</Button>
        </section>
    );
}
