import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_workflow";
const TEMPLATE_ID = "template_f60hb8p";
const PUBLIC_KEY = "v3GLSRdyjYZwq-wEB";

export const sendNotificationEmail = async ({
  title,
  message,
}) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        title,
        message,
        time: new Date().toLocaleString(),
        name: "WorkFlow",
        email: "wiamelalouaa@gmail.com",
      },
      {
        publicKey: PUBLIC_KEY,
      }
    );

    console.log(
      "Email sent successfully:",
      response
    );

    return true;
  } catch (error) {
    console.error("EmailJS ERROR:");
    console.error("Status:", error?.status);
    console.error("Text:", error?.text);
    console.error("Full error:", error);

    return false;
  }
};