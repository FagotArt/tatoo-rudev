import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import axios from "axios";
import crypto from "crypto";

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
    const { email } = await request.json();

    // Сброс пароля и отправка письма
    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ error: "User with this email does not exist" }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 час
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // await axios.post(
    //     `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
    //     new URLSearchParams({
    //         from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
    //         to: email,
    //         subject: "Password Reset",
    //         text: `You requested to reset your password. Click the link to reset: ${resetLink}`,
    //         html: `<p>You requested to reset your password. Click the link to reset: <a href="${resetLink}">Reset Password</a></p>`,
    //     }),
    //     {
    //         auth: {
    //             username: 'api',
    //             password: process.env.MAILGUN_API_KEY!,
    //         },
    //     }
    // );

    return NextResponse.json({ token: resetToken });
}
