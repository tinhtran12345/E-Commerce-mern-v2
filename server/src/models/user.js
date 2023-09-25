import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        // Sdt
        mobile: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            default: "user",
        },
        cart: {
            type: Array,
            default: [],
        },
        address: { type: Array, default: [] },
        // list product: người dùng muốn mua
        wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        passwordChangedAt: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    // console.log(this.isModified("password"));
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
    isCorrectPassword: async function (password) {
        const check = await bcrypt.compare(password, this.password);
        return check;
    },
    //  create resetToken and then  updating passwordResetToken and passwordResetExpire.
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken;
    },
};

const User = mongoose.model("User", userSchema);

export default User;
