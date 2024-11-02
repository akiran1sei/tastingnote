//utils/schemaModels.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupname: String,
  email: [{ type: String }], // 初期値を空の配列にする
});
const BeansSchema = new Schema(
  {
    username: String,
    coffee: String,
    roast: String,
    roastDegree: String,
    aromaDryStrength: String,
    aromaCrustStrength: String,
    aromaBreakStrength: String,
    aromaDryQuality: String,
    aromaCrustQuality: String,
    aromaBreakQuality: String,
    defects: String,
    cleancap: Number,
    sweet: Number,
    acidity: Number,
    acidityStrength: String,
    mouthfeel: Number,
    bodyStrength: String,
    flavor: Number,
    after: Number,
    balance: Number,
    memo: String,
    overall: Number,
    impression: String,
    result: Number,
    total: Number,
    date: String,
    groupname: String,
    userEmail: String,
  },
  { timestamps: true }
);
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
//データーベースをdb変数に代入

export const BeansModel =
  mongoose.models.Beans || mongoose.model("Beans", BeansSchema);
export const GroupModel =
  mongoose.models.Group || mongoose.model("Group", GroupSchema);
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
