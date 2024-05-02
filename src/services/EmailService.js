import axios from "axios";
import html2pdf from 'html2pdf.js';

const BASE_URL = "http://localhost:8080/sendEmail";

export const emailUser = (email, fromEmail, subject, emailContent) => {
  return axios.post(`${BASE_URL}/text`, {
    to: email,
    from: fromEmail,
    subject: subject,
    body: emailContent,
  });
};

export const emailUserBalanceSheet = (email, fromEmail, subject, emailContent, reportHtml) => {
  return new Promise((resolve, reject) => {
    const options = {
      filename: 'balance_sheet_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="width: 100%; padding: 20px;">
        <h2>Balance Sheet Report</h2>
        ${reportHtml}
      </div>
    `;

    html2pdf().set(options).from(element).toPdf().output('blob').then(function (pdfBlob) {
      const formData = new FormData();
      formData.append("to", email);
      formData.append("from", fromEmail);
      formData.append("subject", subject);
      formData.append("body", emailContent);
      formData.append("attachment", pdfBlob, "balance_sheet_report.pdf");

      axios.post(`${BASE_URL}/attachment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((error) => {
      reject(error);
    });
  });
};

export const emailUserTrialBalance = (email, fromEmail, subject, emailContent, reportHtml) => {
  return new Promise((resolve, reject) => {
    const options = {
      filename: 'trial_balance_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="width: 100%; padding: 20px;">
        <h2>Trial Balance Report</h2>
        ${reportHtml}
      </div>
    `;

    html2pdf().set(options).from(element).toPdf().output('blob').then(function (pdfBlob) {
      const formData = new FormData();
      formData.append("to", email);
      formData.append("from", fromEmail);
      formData.append("subject", subject);
      formData.append("body", emailContent);
      formData.append("attachment", pdfBlob, "trial_balance_report.pdf");

      axios.post(`${BASE_URL}/attachment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((error) => {
      reject(error);
    });
  });
};

export const emailUserIncomeStatement = (email, fromEmail, subject, emailContent, reportHtml) => {
  return new Promise((resolve, reject) => {
    const options = {
      filename: 'income_statement_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="width: 100%; padding: 20px;">
        <h2>Income Statement</h2>
        ${reportHtml}
      </div>
    `;

    html2pdf().set(options).from(element).toPdf().output('blob').then(function (pdfBlob) {
      const formData = new FormData();
      formData.append("to", email);
      formData.append("from", fromEmail);
      formData.append("subject", subject);
      formData.append("body", emailContent);
      formData.append("attachment", pdfBlob, "income_statement_report.pdf");

      axios.post(`${BASE_URL}/attachment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((error) => {
      reject(error);
    });
  });
};

export const emailUserRetainedEarnings = (email, fromEmail, subject, emailContent, reportHtml) => {
  return new Promise((resolve, reject) => {
    const options = {
      filename: 'retained_income_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="width: 100%; padding: 20px;">
        <h2>Retained Income</h2>
        ${reportHtml}
      </div>
    `;

    html2pdf().set(options).from(element).toPdf().output('blob').then(function (pdfBlob) {
      const formData = new FormData();
      formData.append("to", email);
      formData.append("from", fromEmail);
      formData.append("subject", subject);
      formData.append("body", emailContent);
      formData.append("attachment", pdfBlob, "retained_income_report.pdf");

      axios.post(`${BASE_URL}/attachment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((error) => {
      reject(error);
    });
  });
};