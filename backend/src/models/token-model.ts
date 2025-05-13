import mongoose, { Schema, Document, Types } from "mongoose";

interface IToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

const TokenSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "15m" }, // Token expires in 15 minutes
  },
  { timestamps: true }
);

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
