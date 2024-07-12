"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send({
        data: 'Here is your data',
    });
});
router.post('/', (_req, res) => {
    res.send({
        data: 'demo created!',
    });
});
exports.default = router;
