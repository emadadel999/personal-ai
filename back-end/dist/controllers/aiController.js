"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullModel = pullModel;
exports.ask = ask;
const ollama_1 = __importDefault(require("ollama"));
function pullModel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query } = req;
            let model = 'deepseek-r1';
            if ((query === null || query === void 0 ? void 0 : query.model) && typeof (query === null || query === void 0 ? void 0 : query.model) === 'string') {
                model = query === null || query === void 0 ? void 0 : query.model;
            }
            const result = yield ollama_1.default.pull({ model, insecure: true, stream: false });
            res.status(200).json(result.status);
        }
        catch (error) {
            console.log('error pulling model: ', error);
            return res.status(200).json("no model returned");
        }
    });
}
;
function ask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            const { query } = req;
            if ((query === null || query === void 0 ? void 0 : query.msg) && typeof (query === null || query === void 0 ? void 0 : query.msg) === 'string') {
                const msg = query === null || query === void 0 ? void 0 : query.msg;
                let model = 'deepseek-r1';
                if ((query === null || query === void 0 ? void 0 : query.model) && typeof (query === null || query === void 0 ? void 0 : query.model) === 'string') {
                    model = query === null || query === void 0 ? void 0 : query.model;
                }
                res.status(200);
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Transfer-Encoding', 'chunked');
                const message = { role: 'user', content: msg };
                const result = yield ollama_1.default.chat({ model, messages: [message], stream: true });
                try {
                    for (var _d = true, result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), _a = result_1_1.done, !_a; _d = true) {
                        _c = result_1_1.value;
                        _d = false;
                        const part = _c;
                        res.write(part.message.content);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = result_1.return)) yield _b.call(result_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.end();
            }
            else
                throw 'no message sent from client';
        }
        catch (error) {
            console.log('error chatting with model: ', error);
            return res.status(200).json("no msg response returned");
        }
    });
}
;
