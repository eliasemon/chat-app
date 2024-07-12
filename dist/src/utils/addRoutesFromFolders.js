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
exports.addRoutesFromFolders = addRoutesFromFolders;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const srcDir = path_1.default.resolve(__dirname, '..');
async function addRoutesFromFolders(router, routesPath) {
    const absoluteRoutesPath = path_1.default.resolve(srcDir, routesPath);
    let totalRoutes = 0;
    async function traverseDirectory(currentPath, baseRoute) {
        const items = await fs_1.promises.readdir(currentPath, { withFileTypes: true });
        for (const item of items) {
            const itemPath = path_1.default.join(currentPath, item.name);
            if (item.isDirectory()) {
                await traverseDirectory(itemPath, `${baseRoute}/${item.name}`);
                // return;
            }
            else if (item.isFile() && (item.name === 'route.ts' || item.name === 'route.js')) {
                try {
                    const routeHandler = (await Promise.resolve(`${itemPath}`).then(s => __importStar(require(s)))).default;
                    router.use(baseRoute, routeHandler);
                    logger_1.default.info(`Route ${baseRoute} added with ${item.name}`);
                    totalRoutes++;
                }
                catch (err) {
                    logger_1.default.error(`Error adding route ${baseRoute}: ${err.message}`);
                }
                // return
            }
        }
    }
    await traverseDirectory(absoluteRoutesPath, '');
    if (totalRoutes > 0) {
        logger_1.default.info(`${totalRoutes} routes have been added`);
        logger_1.default.info('Routes added successfully');
    }
    else {
        logger_1.default.info(`No routes have been added`);
    }
}
