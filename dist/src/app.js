"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoute = initializeRoute;
const morgan_1 = require("./middlewares/globals/morgan");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const rqIdGenerator_1 = require("./middlewares/globals/rqIdGenerator");
const errorHandler_1 = __importDefault(require("./middlewares/globals/errorHandler"));
const notFoundHandler_1 = __importDefault(require("./middlewares/globals/notFoundHandler"));
const logger_1 = __importDefault(require("./utils/logger"));
const addRoutesFromFolders_1 = require("./utils/addRoutesFromFolders");
// Express Application
const app = (0, express_1.default)();
// Body Parser
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)());
// add the id to the request
app.use(rqIdGenerator_1.generateRequestId);
// request response logger middleware
app.use((0, morgan_1.requestLogger)());
// Static Serve
app.use(express_1.default.static(path_1.default.join(__dirname, '../../src/public')));
async function initializeRoute() {
    const router = express_1.default.Router();
    try {
        await (0, addRoutesFromFolders_1.addRoutesFromFolders)(router, './api');
        app.use("/api", router);
    }
    catch (error) {
        logger_1.default.error('Error adding routes:', error);
    }
    // NotFound Handler
    app.use(notFoundHandler_1.default);
    // errorHandler
    app.use(errorHandler_1.default);
}
exports.default = app;
