export const extractEmailDetails = (gmailResponse) => {
    const emailSubject = getHeader(gmailResponse, 'Subject');
    const emailSnippet = gmailResponse.snippet;

    let emailBody = '';
    let emailContent = '';

    // Extract email body
    if (gmailResponse.payload.mimeType === 'multipart/alternative') {
        // If the email is multipart, look at the parts array to find the text or HTML content
        const bodyParts = gmailResponse.payload.parts;
        emailBody = bodyParts.find(part => part.mimeType === 'text/plain')?.body.data || '';
        emailContent = bodyParts.find(part => part.mimeType === 'text/html')?.body.data || '';
    } else if (gmailResponse.payload.mimeType === 'text/plain') {
        // Single part email with plain text
        emailBody = gmailResponse.payload.body.data;
    }

    // Decode the base64url encoded email body
    emailBody = decodeBase64Url(emailBody);
    emailContent = decodeBase64Url(emailContent);

    return {
        emailSubject,
        emailSnippet,
        emailBody,
        emailContent
    };
};

// Helper function to get the header value by name
const getHeader = (gmailResponse, headerName) => {
    const header = gmailResponse.payload.headers.find(h => h.name === headerName);
    return header ? header.value : '';
};

// Function to decode base64url encoded string
const decodeBase64Url = (base64url) => {
    if (!base64url) return '';
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);  // Decode base64 string
};
