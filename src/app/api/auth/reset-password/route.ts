import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from 'nodemailer';

mongoose.connect(process.env.DATABASE!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(request: NextRequest) {
    //return NextResponse.json({ message: 'good' });
    //return NextResponse.json({ message: 'Password reset link has been sent to your email.' });
    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User with this email does not exist" }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
    //
    const resetLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}login-reset?token=${resetToken}`;

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: 'Reset Password Inkformed Tattoos',
            text: `Password reset request, ${user.email}, if you want to reset your password, click on the link: ${resetLink}`,
            html: `<p>Password reset request, ${user.email}, if you want to reset your password</p><p>Click on the link: <a href="${resetLink}">Reset Password</a></p>`
        });

        return NextResponse.json({ message: 'Password reset link has been sent to your email.' });

    } catch (error) {
        return NextResponse.json({ error: "Error email reset " + error }, { status: 400 });
    }

}
