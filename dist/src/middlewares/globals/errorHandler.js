"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const errorHandler = (error, req, res, next) => {
    logger_1.default.error('Error:', error);
    if (error.status) {
        res.status(error.status).send(error.message);
    }
    else {
        res.status(500).send('Something went wrong');
    }
    next(error);
};
exports.default = errorHandler;
