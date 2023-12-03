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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const userAction_1 = require("../../model/auth/userAction");
function authenticateUser(req, res, next, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Checking if user has session...');
        try {
            const user = yield (0, userAction_1.isUserInSession)(uid);
            const hasSession = user.records.map((record) => record.get('user')).toString();
            console.log('does it have session?', hasSession);
            if (!hasSession) {
                return next((0, http_errors_1.default)(401, 'The uid is not correct or the user is not in session'));
            }
            next();
        }
        catch (error) {
            res.status(404).json({ status: false, message: error });
            next(error);
        }
    });
}
exports.default = authenticateUser;
