"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const httpError_1 = __importDefault(require("./api/helpers/httpError"));
const routes_1 = __importDefault(require("./api/routes"));
const http_1 = require("http");
const qs_1 = __importDefault(require("qs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set('query parser', function (str) {
    return qs_1.default.parse(str, { /* custom options */});
});
/* Routes */
app.use("/api", routes_1.default);
//to throw error for undefined routes
app.use((req, res, next) => {
    const error = new httpError_1.default("Cannot find this route", 404);
    throw error;
});
// to catch any error
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code);
    res.json({ message: error.message });
});
const express_server = (0, http_1.createServer)(app);
express_server.listen(process.env.PORT, function () {
    const addressInfo = express_server === null || express_server === void 0 ? void 0 : express_server.address();
    console.log("Listening to port", addressInfo.port);
});
