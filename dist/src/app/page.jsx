"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const sidebar_1 = __importDefault(require("./components/sidebar"));
function Home() {
    return (<>
      <sidebar_1.default />
    </>);
}
