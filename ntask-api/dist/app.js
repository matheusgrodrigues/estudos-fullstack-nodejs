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
const server_1 = require("./server");
const task_1 = __importDefault(require("./routes/task"));
const router = (0, server_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ tasks: "NTask API" });
}));
router.route("/tasks").get(task_1.default.findAll);
router
    .route("/tasks/:id")
    .delete(task_1.default.delete)
    .post(task_1.default.create)
    .get(task_1.default.findOne)
    .put(task_1.default.update);
exports.default = router;
