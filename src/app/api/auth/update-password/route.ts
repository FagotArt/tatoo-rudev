import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import axios from "axios";
import crypto from "crypto";
import bcrypt from "bcryptjs";

mongoose.connect(process.env.DATABASE!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ error: "User with this email does not exist" }, { status: 400 });
    }

    // const newPasswordHash = await bcrypt.hash(password, process.env.CRYPTO_SECRET);
    // const token = await bcrypt.hash(password, process.env.CRYPTO_SECRET);

     const newPasswordHash = await bcrypt.hash(password, 10);
     // const token = await bcrypt.hash(password, 10);

    // Обновляем пароль пользователя
    user.password = newPasswordHash;
    // user.token = token;
    await user.save();

    // // Создание токена с зашифрованным старым и новым паролями
    // const token = crypto.createCipher('aes-256-ctr', process.env.CRYPTO_SECRET!)
    //     .update(JSON.stringify({ email, oldPassword: user.password, newPassword: newPasswordHash }), 'utf8', 'hex');
    //
    // const resetLink = `${process.env.NEXTAUTH_URL}/api/auth/update-password?token=${token}`;
    //
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

    return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    try {
        const decrypted = crypto.createDecipher('aes-256-ctr', process.env.CRYPTO_SECRET!)
            .update(token, 'hex', 'utf8');

        const { email, oldPassword, newPassword } = JSON.parse(decrypted);

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return NextResponse.json({ error: "Invalid token or password" }, { status: 400 });
        }

        user.password = newPassword;
        await user.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
}
