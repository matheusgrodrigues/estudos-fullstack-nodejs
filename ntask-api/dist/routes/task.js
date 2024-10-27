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
const Task_1 = __importDefault(require("../model/Task"));
const errorResponse = (error, res) => {
    const { message } = error;
    res.status(402).json({ message });
};
const taskRouter = {
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Task_1.default.findAll();
            res.json({ tasks: result }).status(200);
        }
        catch (error) {
            errorResponse(error, res);
        }
    }),
    findOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Task_1.default.findOne({ where: req.params });
            result !== undefined ? res.json(result) : res.sendStatus(404);
        }
        catch (error) {
            errorResponse(error, res);
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Task_1.default.create(req.body);
            res.json(result);
        }
        catch (error) {
            errorResponse(error, res);
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Task_1.default.update(req.body, { where: req.params });
            res.sendStatus(204);
        }
        catch (error) {
            errorResponse(error, res);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Task_1.default.destroy({ where: req.params });
            res.sendStatus(204);
        }
        catch (error) {
            errorResponse(error, res);
        }
    }),
};
exports.default = taskRouter;
