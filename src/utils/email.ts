import { createTransport, getTestMessageUrl } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { html } from "@app/static/verify-account";

export const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

export const sendEmail = (options: Mail.Options) => {
  try {
    transport.sendMail(options, (err, info) => {
      if (err) {
        console.error("Error while transporting mail", err);
      } else {
        console.log("Email sent", info.response);
        console.log("Preview URL: %s", getTestMessageUrl(info));
      }
    });
  } catch (err) {
    console.error("Error while sending email", err);
  }
};

export async function buildEmail(firstName: string, token: string) {
  let content = html;
  content = content.replace(
    /{{verification_link}}/g,
    `http://localhost:3000/verify-account/${encodeURI(token)}`,
  );
  content = content.replace(/{{first_name}}/g, firstName);
  return content;
}
