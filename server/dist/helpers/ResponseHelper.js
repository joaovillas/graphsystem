"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper = (message, statusCode) => {
    return {
        "message": message,
        "status_code": statusCode,
    };
};
exports.default = helper;
