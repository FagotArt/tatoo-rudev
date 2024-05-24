import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    const { token, password } = await request.json();

    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password has been updated.' });
}
