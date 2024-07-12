"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.prettyPrint()),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
            level: 'info',
            format: winston_1.format.json(),
        }),
        new winston_daily_rotate_file_1.default({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
            level: 'error',
            format: winston_1.format.json(),
        }),
        new winston_1.default.transports.Console({
            level: 'debug',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf((info) => {
                const { level, message, timestamp } = info;
                return `[${timestamp}] ${level}: ${message}`;
            })),
        }),
    ],
});
exports.default = logger;
