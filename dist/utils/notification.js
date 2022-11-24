"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = exports.sendmail = exports.onRequestOTP = exports.GenerateOTP = void 0;
const config_1 = require("../config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const GenerateOTP = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOTP = GenerateOTP;
const onRequestOTP = async (otp, toPhoneNumber) => {
    const client = require("twilio")(config_1.accountSid, config_1.authToken);
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: toPhoneNumber,
        from: config_1.fromAdminPhone,
    });
    return response;
};
exports.onRequestOTP = onRequestOTP;
let transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.GMAIL_USER,
        pass: config_1.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendmail = async (from, to, subject, html) => {
    try {
        const response = await transport.sendMail({
            from: config_1.FromAdminMail,
            to,
            subject: config_1.userSubject,
            html,
        });
        return response;
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendmail = sendmail;
const emailHtml = (otp) => {
    const temp = `
     <div style="max-width:700px;font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto;">
     <h2 style="text-transform:uppercase; text-align:center; color:teal;">
      Welcome to Food Kosi store
     </h2>
     <p>Hi there, your otp is ${otp}, it will expire in 30mins</p>
     </div>
   `;
    return temp;
};
exports.emailHtml = emailHtml;
