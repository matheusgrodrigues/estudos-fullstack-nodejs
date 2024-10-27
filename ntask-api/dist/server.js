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
exports.Router = void 0;
const express_1 = __importStar(require("express"));
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_1.Router; } });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./core/database"));
const Task_1 = __importDefault(require("./model/Task"));
const User_1 = __importDefault(require("./model/User"));
const setupTableRelation = () => {
    Task_1.default.belongsTo(User_1.default);
    User_1.default.hasMany(Task_1.default);
};
const syncDatabase = () => database_1.default
    .sync({ alter: true })
    .then(() => console.log("Banco de dados foi sincronizado."))
    .catch((err) => console.error("Erro ao sincronizar o banco de dados."));
const setupDatabase = () => {
    setupTableRelation();
    syncDatabase();
};
const app = (0, express_1.default)();
const port = 3000;
app.set("json spaces", 4);
app.set("port", port);
app.use(express_1.default.json());
app.use(app_1.default);
app.use((req, res, next) => {
    req.body && delete req.body.id;
    next();
});
setupDatabase();
app.listen(port, () => {
    console.log(`NTask API - porta ${port}`);
});
exports.default = app;
