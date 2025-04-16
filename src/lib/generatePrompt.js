// export const generatePrompt = (emailContent) => {
//     return `
//       You are an advanced AI designed to process emails related to job applications. Your task is to classify emails into two categories: "job" or "non_job". Only classify emails related to job applications that the user has **personally applied to**. Ignore promotional job alerts and unrelated newsletters.

//       **Objective**: Given the following email content, perform the following actions:

//       ### Step 1: Classify the Email
//       - Classify the email as either "job" or "non_job".

//       **"job" email criteria**:
//       - The email is a direct response to a job application you submitted (e.g., an interview invitation, confirmation of application receipt, or job offer).
//       - The email contains job application statuses like "Round 1 cleared", "Interview scheduled", "Offer extended", or "Offer accepted".

//       **"non_job" email criteria**:
//       - The email is a **job alert** (e.g., generic job posting emails, matching job emails, newsletters).
//       - The email does not relate to a job you've applied to, nor does it include details about any specific job you’re involved with.

//       ### Step 2: Extract Job Details (If classified as "job")
//       If the email is classified as "job", extract the following structured data:

//       1. **jobTitle** – The job title being applied for (e.g., "Frontend Developer", "Data Scientist").
//       2. **company** – The company offering the job.
//       3. **platform** – The platform where the job application was made (e.g., LinkedIn, Indeed, Company Career Page).
//       4. **location** – The location of the job (e.g., city, country, or "remote").
//       5. **jobType** – The job type (e.g., Internship, Full-time, Part-time).
//       6. **appliedAt** – The date when the job application was submitted (e.g., inferred from the email metadata or content).

//       ### Step 3: Classify Job Status
//       Extract or infer the status of the job application based on email content:

//       - Specific Round-Based Status: If the email mentions specific stages (e.g., "Interview scheduled", "Offer extended"), extract them.
//       - Generalized Status: If no specific stages are mentioned, infer the status using tone or keywords:
//           - "Applied" – If the email mentions application submission or confirmation.
//           - "Interview" – If the email mentions interview scheduling.
//           - "Offer" – If the email mentions a job offer.
//           - "Selected" – If the email indicates selection for the position.
//           - "Rejected" – If the email mentions rejection.

//       If no status can be extracted, default to "Applied".

//       ### Step 4: Format Output
//       Return the classified job email details in the following JSON format:
//       {
//           "type": "job",  // or "non_job"
//           "jobTitle": "Web Developer Intern",
//           "company": "Unified Mentor Pvt Ltd",
//           "platform": "LinkedIn",
//           "location": "Remote",
//           "jobType": "Internship",
//           "appliedAt": "2025-04-10",
//           "status": ["Round 1 cleared", "Interview scheduled"]
//       }

//       ### Step 5: Data Integrity
//       - If no job-related data can be extracted, default the status to "Applied".
//       - If the email is classified as "non_job" (e.g., job alerts or unrelated emails), return no job details.

//       Email Content: 
//       ${emailContent}
//   `;
// };


export const generatePrompt = (emailBody, emailSnippet, emailSubject, receivedDate) => {
  return `
You are a highly intelligent assistant trained to analyze job-related emails and output structured JSON data. Only respond with JSON — no explanation or extra commentary.

---

## 🔍 Your task is to:
1. Classify the email into:
   - **"job"**: Related to a job/internship the user applied to or registered for.
   - **"non_job"**: General job alerts, newsletters, updates, or promotions.
   - **"unable_to_analyze"**: Vague or incomplete information.

2. If classified as **"job"**, intelligently extract these fields using context and common sense:

| Field        | Description |
|--------------|-------------|
| \`jobTitle\`  | If not directly mentioned, infer from phrases like "Open Campus Recruitment", "Hiring Drive", etc. You can use that phrase as a fallback. |
| \`company\`   | Look for the sender or any company mention in body. |
| \`platform\`  | Detect platforms like LinkedIn, Naukri, Superset, HackerEarth, HirePro, etc. Even if casually mentioned. |
| \`location\`  | Use if mentioned, else return "". |
| \`jobType\`   | Use hints to infer: if "intern", "summer", "campus" → "Internship", else → "Full-time". |
| \`appliedAt\` | Extract a date or approximate month if stated (e.g., "registered on March 24"). If not explicitly mentioned but registration is confirmed, you may assume the date the email was received: **"${receivedDate}"**. |
| \`status\`    | A **single most relevant status** like "Registered", "Shortlisted", "Interview Scheduled", "Selected", or "Rejected" — based on this specific email only. |

---

## 🧠 Use Common Sense Rules:
- "Campus Recruitment", "Hiring Drive" → likely "Full-time" unless "intern" or "summer" is mentioned.
- "Summer Internship", "Intern Opportunity" → "Internship".
- If job title isn’t stated but event/role is described, use that as title.
- Only infer one status from the email — the one **most clearly represented** in the email's content.
- Avoid mixing multiple stages (e.g., don’t return ["Registered", "Shortlisted"] unless explicitly stated in the same email).

---

## 📨 Email Details:
### 📌 Subject:
${emailSubject}

### ✂️ Snippet:
${emailSnippet}

### 📝 Body:
${emailBody}

---
## 📦 Return ONLY a JSON block in one of the following formats:

### ✅ Job Email:
\`\`\`json
{
  "type": "job",
  "jobTitle": "",
  "company": "",
  "platform": "",
  "location": "",
  "jobType": "",
  "appliedAt": "",
  "status": ""
}
\`\`\`

### 🚫 Non-Job Email:
\`\`\`json
{ "type": "non_job" }
\`\`\`

### ❓ Unclear:
\`\`\`json
{ "type": "unable_to_analyze" }
\`\`\`
`;
};
