"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const task_1 = __importDefault(require("./routes/task"));
const router = (0, server_1.Router)();
router.get("/", (req, res) => {
    res.json({ tasks: "NTask API" });
});
router.get("/tasks", task_1.default.get);
exports.default = router;
