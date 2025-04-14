export async function GET(request) {
    console.log("hello from server")

    return new Response("Cron job executed!", { status: 200 });
}