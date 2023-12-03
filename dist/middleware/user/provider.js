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
exports.createParseProviderData = exports.checkUserStatus = void 0;
const action_1 = require("../../config/action");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
function createParseProviderData(transportDataToNeo4j) {
    return function parseProviderData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const userData = yield firebase_admin_1.default.auth().getUserByEmail(email);
                req.data = Object.assign({}, transportDataToNeo4j(userData));
                next();
            }
            catch (err) {
                next(err);
            }
        });
    };
}
exports.createParseProviderData = createParseProviderData;
function checkUserStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const user = yield (0, action_1.read)(`
         MATCH(u:User { email: $email })
         RETURN u.email as user
         `, {
            email: email,
        });
        const isUserInDatabase = user.records
            .map((record) => record.get('user'))
            .toString();
        req.isNewUser = (isUserInDatabase === null || isUserInDatabase === void 0 ? void 0 : isUserInDatabase.length) < 1;
        next();
    });
}
exports.checkUserStatus = checkUserStatus;
