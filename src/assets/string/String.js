import {stringsFa} from "./strings/strings-fa";
import {stringsEn} from "./strings/strings-en";

export default function getResources(lang) {
    switch (lang) {
        case "en":
            return stringsEn;
        case "fa":
            return stringsFa;
        default:
            throw Error(lang + " is invalid language");
    }
}
