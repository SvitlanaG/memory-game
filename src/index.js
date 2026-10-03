import "./index.html";
import "./index.scss";
import * as Frame from "./modules/frameComponent";
import { initializeGame } from "./modules/gameController";

const body = document.querySelector("body");
const game = Frame.createComponent();
body.append(game);
initializeGame(game);
