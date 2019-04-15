"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
// imports all routes from routes module
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        // run the express instance and store in app
        this.app = express_1.default();
        this.config();
    }
    config() {
        this.app.use(cors_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // add routes
        this.app.use("/api/v1", routes_1.default);
    }
}
exports.default = new App().app;
