import Store, {STORE_TYPE} from "./Store";
import Button from "./form/buttons/Button";
import Res from "../../assets/Res";
import History from "../../History";


export default class Confirm extends Store {
    static type = STORE_TYPE.SINGLETON;
    static storeName = 'Confirm';

    static getActions() {
        return ['open'];
    }

    getInitialState(args) {
        return {
            cancel_button: Button.create_back(),
            confirm_button: Button.createSubmit({
                title: Res.string.ok,
                onClick: () => this.confirm(),
                className: `end raised primary`,
            }),
            title: undefined,
            text: undefined,
            callback: undefined,
        }
    }

    cancel() {
        History.goBack();
    }

    confirm() {
        History.goBack();
        setTimeout(() => this.state.callback(), 200);
    }

    open(title, text, callback, confirm_title = Res.string.ok, confirm_class = 'raised primary') {
        this.state.title = title;
        this.state.text = text;
        this.state.callback = callback;
        this.save();
        this.state.confirm_button.set_title(confirm_title);
        this.state.confirm_button.setClassName(`end ${confirm_class}`);
        History.pushSmallModal('confirm/');
    }
	static open(title, text, callback, confirm_title=Res.string.ok, confirm_class='raised primary'){
    	Confirm.get().open(title,text,callback,confirm_title,confirm_class);
	}
}
