const nodemailer = require("nodemailer");


var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});


exports.sendWelcomeEmail = async ({
                                      email,
                                      emailText,
                                      emailsSubject,
                                      token
                                  }) => {

    var mailOptions = {

        from: process.env.MAIL_USERNAME || 'kemenegoula@gmail.com',
        to: email,
        subject: emailsSubject,
        text: emailText,
        html: `<p>
        <h1 style="text-align:center">Welcome aboard.</h1>
        <div style="text-align:center">It's a pleasure to offer you our service.</div>
        <div style="text-align:center">Just one extra step away.</div>
        </br>
        <div style="text-align:center">Please verify your account by clicking on the following link .
            <a style="padding:8px 16px; display: block; background: dodgerblue; max-width: 300px; margin: 12px auto 0; text-align: center; border-radius: 2px; text-decoration: none; color: white;" href='https://localhost:3000/api/membre/emailverification?token=${token}'>Verify email account</a>            <strong style="font-size: 10px;">Your account will be locked out if this step is not completed</strong></div>
    </p>`,
    };
    const info = await transport.sendMail(mailOptions);

    const {
        messageId
    } = info;

    if (!messageId) {
        throw new Error("An error occured .Please contact developer team");
    }

}


exports.sendPasswordResetEmail = async ({
                                            email,
                                            emailText,
                                            emailsSubject,
                                            token
                                        }) => {


    var mailOptions = {

        from: process.env.MAIL_USERNAME || 'kemenegoula@gmail.com',
        to: email,
        subject: emailsSubject,
        text: emailText,
        html: `<p>
    <h1 style="text-align:center">Password reset.</h1>
    <div style="text-align:center">It seems you have forgotten your password.No worries we got you covered</div>
    <div style="text-align:center">Just one extra step away.</div>
    </br>
    <div style="text-align:center">Reset your account's password by clicking on the following link .
        <a style="padding:8px 16px; display: block; background: dodgerblue; max-width: 300px; margin: 12px auto 0; text-align: center; border-radius: 2px; text-decoration: none; color: white;" href='https://localhost:3000/api/membre/resetpassword?token=${token}'>Verify email account</a>
        <strong style="font-size: 10px;">Your account will be locked out if this step is not completed</strong></div>
</p>`,
    };
    const info = await transport.sendMail(mailOptions);

    const {
        messageId
    } = info;


    if (!messageId) {
        throw new Error("An error occured .Please contact developer team");
    }

}


exports.sendPaymentEmail = async ({
                                      email,
                                      emailText,
                                      emailsSubject,
                                      token
                                  }) => {


    var mailOptions = {

        from: process.env.MAIL_USERNAME || 'kemenegoula@gmail.com',
        to: email,
        subject: emailsSubject,
        text: emailText,
        html: `<p>
    <h1 style="text-align:center">Claim your payment.</h1>
    <div style="text-align:center">It seems you just performed a payment.</div>
    <div style="text-align:center">Just one extra step away from using our platform on a per desire basis.</div>
    </br>
    <div style="text-align:center">Claim your payment by clicking on the following link .
        <a style="padding:8px 16px; display: block; background: dodgerblue; max-width: 300px; margin: 12px auto 0; text-align: center; border-radius: 2px; text-decoration: none; color: white;" href='https://localhost:3000/verify-payment?token=${token}'>Claim payment</a>
        <strong style="font-size: 10px;">Note this link is valid till you click on it</strong></div>
</p>`,
    };
    const info = await transport.sendMail(mailOptions);

    const {
        messageId
    } = info;


    if (!messageId) {
        throw new Error("An error occured .Please contact developer team");
    }

}
