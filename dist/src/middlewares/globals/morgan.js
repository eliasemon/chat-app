"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token('id', (req) => req.id);
const morganFormat = ':id :method :url :status :response-time ms';
const requestLogger = () => (0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            const [id, method, url, status, responseTime] = message.split(' ');
            const logObject = {
                id,
                method,
                url,
                status,
                responseTime,
            };
            logger_1.default.info(JSON.stringify(logObject));
        },
    },
});
exports.requestLogger = requestLogger;
