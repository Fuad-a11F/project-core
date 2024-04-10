import nodeMailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ffuad5046@gmail.com",
      pass: "jgil pdji osto dxeq",
    },
  });

  await transporter.sendMail({
    from: "ffuad5046@gmail.com",
    to,
    subject,
    html,
  });
};

export default sendEmail;
