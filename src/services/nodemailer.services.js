import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: `${process.env.NODEMAILER_SERVICE}`,
  port: `${process.env.NODEMAILER_PORT}`,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: `${process.env.NODEMAILER_USER_MAILID}`,
    pass: `${process.env.NODEMAILER_USER_PASSKEY}`,
  },
});

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class NodeMailer {
  static sendNodeMail = async (receiver_email, subject, otp, content) => {
    try {
      const info = await transporter
        .sendMail({
          from: `"CodeTalk One Time Password </>" <${process.env.NODEMAILER_SENDER}>`,
          to: `${receiver_email}`,
          subject: `${subject}`,

          text: "radhe radhe",
          html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px;">
              <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">${otp}</h1>
                <p style="font-size: 16px; color: #666666; line-height: 1.5;">${content}</p>
              </div>
            </div>
          </div>
          `,
        })
        .then(() => {
          console.log("Message sent successfully");
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export default NodeMailer;
