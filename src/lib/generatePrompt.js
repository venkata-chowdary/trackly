// export const generatePrompt = (emailContent) => {
//     return `
//         You are a highly advanced AI designed to process and classify job-related emails with precision.

//         **Objective**: Given the following email content, perform the following actions:

//         ### Step 1: Classify the Email
//         - Classify the email as either "job" or "non_job".
//         - A "job" email is typically a message related to a job application, job posting, interview, offer, or rejection.
//         - A "non_job" email is anything else (e.g., personal emails, notifications, irrelevant newsletters).

//         ### Step 2: Extract Job Details (If classified as "job")
//         If the email is classified as "job", extract the following structured data:

//         1. **jobTitle** – The specific job title or role being applied for (e.g., "Web Developer", "Data Scientist").
//         2. **company** – The company offering the job.
//         3. **platform** – The platform or website from where the job application was made (e.g., LinkedIn, Indeed, Company Career Page, etc.).
//         4. **location** – The job's location (can be a city, country, or mention of "remote"). If not found, leave it blank.
//         5. **jobType** – The type of job (e.g., Internship, Full-time, Part-time, Contract, etc.).
//         6. **appliedAt** – The date when the job application was submitted, derived from the email metadata or inferred from the content.

//         ### Step 3: Classify Job Status
//         Extract or infer the status of the job application based on email content:

//         - Specific Round-Based Status:
//           - If an email contains detailed information about the job application stages (e.g., "Round 1 cleared", "Interview scheduled", "Offer extended"), extract and include those stages in the status.
//           - Common stages might include:
//             - "Round 1 cleared"
//             - "Round 2 cleared"
//             - "Interview scheduled"
//             - "Offer extended"
//             - "Offer accepted"
//             - "Rejected" (for rejection emails)
//             - "Selected" (if the candidate is selected)

//         - Generalized Status:
//           - If no specific stages are mentioned, infer the status using the tone or keywords in the email.
//             - "Applied" – If the email is an application confirmation, or a generic job listing.
//             - "Interview" – If the email mentions interview scheduling, shortlisting, or interview steps.
//             - "Rejected" – If the email clearly mentions rejection.
//             - "Offer" – If the email mentions an offer being extended or received.
//             - "Selected" – If the email indicates that the user has been selected for the position.

//         If no status can be extracted, default to "Applied".

//         ### Step 4: Format Output
//         Return the classified job email details in the following JSON format:
//         {
//             "type": "job",  // or "non_job"
//             "jobTitle": "Web Developer Intern",
//             "company": "Unified Mentor Pvt Ltd",
//             "platform": "LinkedIn",
//             "location": "Remote",
//             "jobType": "Internship",
//             "appliedAt": "2025-04-10",
//             "status": ["Round 1 cleared", "Interview scheduled"]
//         }

//         ### Step 5: Data Integrity
//         - If no job-related data can be extracted, default the status to "Applied".
//         - If the email doesn't contain any job-specific content, classify it as "non_job" and return no job details.

//         Email Content: 
//         ${emailContent}
//     `;
// };


export const generatePrompt = (emailContent) => {
  return `
      You are an advanced AI designed to process emails related to job applications. Your task is to classify emails into two categories: "job" or "non_job". Only classify emails related to job applications that the user has **personally applied to**. Ignore promotional job alerts and unrelated newsletters.

      **Objective**: Given the following email content, perform the following actions:
      
      ### Step 1: Classify the Email
      - Classify the email as either "job" or "non_job".
      
      **"job" email criteria**:
      - The email is a direct response to a job application you submitted (e.g., an interview invitation, confirmation of application receipt, or job offer).
      - The email contains job application statuses like "Round 1 cleared", "Interview scheduled", "Offer extended", or "Offer accepted".
      
      **"non_job" email criteria**:
      - The email is a **job alert** (e.g., generic job posting emails, matching job emails, newsletters).
      - The email does not relate to a job you've applied to, nor does it include details about any specific job you’re involved with.

      ### Step 2: Extract Job Details (If classified as "job")
      If the email is classified as "job", extract the following structured data:
      
      1. **jobTitle** – The job title being applied for (e.g., "Frontend Developer", "Data Scientist").
      2. **company** – The company offering the job.
      3. **platform** – The platform where the job application was made (e.g., LinkedIn, Indeed, Company Career Page).
      4. **location** – The location of the job (e.g., city, country, or "remote").
      5. **jobType** – The job type (e.g., Internship, Full-time, Part-time).
      6. **appliedAt** – The date when the job application was submitted (e.g., inferred from the email metadata or content).
      
      ### Step 3: Classify Job Status
      Extract or infer the status of the job application based on email content:
      
      - Specific Round-Based Status: If the email mentions specific stages (e.g., "Interview scheduled", "Offer extended"), extract them.
      - Generalized Status: If no specific stages are mentioned, infer the status using tone or keywords:
          - "Applied" – If the email mentions application submission or confirmation.
          - "Interview" – If the email mentions interview scheduling.
          - "Offer" – If the email mentions a job offer.
          - "Selected" – If the email indicates selection for the position.
          - "Rejected" – If the email mentions rejection.
      
      If no status can be extracted, default to "Applied".
      
      ### Step 4: Format Output
      Return the classified job email details in the following JSON format:
      {
          "type": "job",  // or "non_job"
          "jobTitle": "Web Developer Intern",
          "company": "Unified Mentor Pvt Ltd",
          "platform": "LinkedIn",
          "location": "Remote",
          "jobType": "Internship",
          "appliedAt": "2025-04-10",
          "status": ["Round 1 cleared", "Interview scheduled"]
      }
      
      ### Step 5: Data Integrity
      - If no job-related data can be extracted, default the status to "Applied".
      - If the email is classified as "non_job" (e.g., job alerts or unrelated emails), return no job details.
      
      Email Content: 
      ${emailContent}
  `;
};
