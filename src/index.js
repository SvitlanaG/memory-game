import "./index.html";
import "./index.scss";
import * as Frame from "./modules/frameComponent";

const body = document.querySelector("body");
body.append(Frame.createComponent());
