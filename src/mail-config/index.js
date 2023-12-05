const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.userEmail,
        pass: config.userPassword,
    },
});

const sendMail = async ({ to, subject, message }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Sukanta Majhi😈" ${config.userEmail}`,
            to,
            subject,
            html: message,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error(error, "<<-- Error in email send");
    }
};

module.exports = sendMail;
