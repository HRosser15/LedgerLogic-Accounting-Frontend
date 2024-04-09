import axios from "axios";

const BASE_URL = "http://localhost:8080/sendEmail";

export const emailUser = (email, fromEmail, subject, emailContent) => {
  return axios.post(`${BASE_URL}`, {
    
    to: email,
    from: fromEmail,
    subject: subject,
    body: emailContent,
  });
};