"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestId = void 0;
const uuid_1 = require("uuid");
const generateRequestId = (req, _res, next) => {
    req.id = (0, uuid_1.v4)();
    next();
};
exports.generateRequestId = generateRequestId;
