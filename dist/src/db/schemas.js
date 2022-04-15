"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = exports.questionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.questionSchema = new mongoose_1.Schema({
    from: Object,
    text: String,
    answer: {
        from: Object,
        text: String,
    },
});
exports.sessionSchema = new mongoose_1.Schema({
    _id: { $oid: String },
    key: String,
    value: Object,
});
