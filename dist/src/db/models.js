"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.Question = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("./schemas");
exports.Question = (0, mongoose_1.model)("Question", schemas_1.questionSchema);
exports.Session = (0, mongoose_1.model)("Session", schemas_1.sessionSchema);
