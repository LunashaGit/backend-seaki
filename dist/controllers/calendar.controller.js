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
exports.DeleteEvent = exports.ModifyEvent = exports.AddEvent = void 0;
const mongoose_1 = require("mongoose");
const calendar_model_1 = __importDefault(require("../models/calendar.model"));
const AddEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, description } = req.body;
    try {
        const calendar = yield calendar_model_1.default.create({
            name,
            date,
            description,
        });
        res.status(201).json({ calendar: calendar.name + " Created" });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.AddEvent = AddEvent;
const ModifyEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        yield calendar_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description,
            },
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        })
            .then((docs) => {
            res.send(docs);
        })
            .catch((err) => res.status(400).send({ message: err }));
    }
    catch (err) {
        return res.status(400).send({ message: err });
    }
});
exports.ModifyEvent = ModifyEvent;
const DeleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        yield calendar_model_1.default.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: "Successfully deleted. " });
    }
    catch (err) {
        return res.status(400).send({ message: err });
    }
});
exports.DeleteEvent = DeleteEvent;
//# sourceMappingURL=calendar.controller.js.map