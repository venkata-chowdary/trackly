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


export const generatePrompt = (emailContent) => {
    return `
  You are an intelligent assistant trained to analyze job-related emails and return structured JSON output. You must classify the email as one of the following types: "job", "non_job", or "unable_to_analyze". Do not respond with anything outside the expected JSON format.
  
  ---
  
  ## ✅ Classification Rules:
  
  1. **"job"**
     - Email is a direct response to a job the user applied for.
     - Examples: interview invitations, shortlisting emails, selection/rejection, offer letters, etc.
  
  2. **"non_job"**
     - Email contains job alerts, platform notifications, promotions, or general newsletters.
     - Not tied to a specific application made by the user.
  
  3. **"unable_to_analyze"**
     - Email content is too vague, lacks information, or cannot be confidently classified into "job" or "non_job".
  
  ❗️ If you're unsure or the email is too ambiguous, you MUST return:
  \`\`\`json
  { "type": "unable_to_analyze" }
  \`\`\`
  
  ---
  
  ## 🧠 For "job" type, extract the following details:
  - \`jobTitle\`: e.g., "Backend Developer Intern"
  - \`company\`: e.g., "Google"
  - \`platform\`: e.g., "LinkedIn", "Naukri"
  - \`location\`: e.g., "Remote", "Hyderabad", or leave blank if not mentioned
  - \`jobType\`: e.g., "Internship", "Full-time"
  - \`appliedAt\`: the date the user applied (if available or inferable)
  - \`status\`: a list of one or more status updates from the email (e.g., ["Interview scheduled", "Shortlisted"])
  
  ---
  
  ## 📦 Output Format
  
  Return **only one** of the following JSON responses:
  
  ### 1. For Job-Related Email:
  \`\`\`json
  {
    "type": "job",
    "jobTitle": "",
    "company": "",
    "platform": "",
    "location": "",
    "jobType": "",
    "appliedAt": "",
    "status": [""]
  }
  \`\`\`
  
  ### 2. For Non-Job Email:
  \`\`\`json
  {
    "type": "non_job"
  }
  \`\`\`
  
  ### 3. For Unclear/Ambiguous Email:
  \`\`\`json
  {
    "type": "unable_to_analyze"
  }
  \`\`\`
  
  ---
  
  ⚠️ Important:
  - Do not include any explanation or notes — return the JSON only.
  - If the classification cannot be confidently determined, return \`{ "type": "unable_to_analyze" }\` without hesitation.
  
  ---
  
  ## 📩 Email Content:
  
  ${emailContent}
  `;
};
