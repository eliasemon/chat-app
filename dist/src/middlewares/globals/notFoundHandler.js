"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
};
exports.default = notFoundHandler;
