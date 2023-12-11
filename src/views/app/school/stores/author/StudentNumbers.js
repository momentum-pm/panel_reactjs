import Store, { STORE_TYPE } from "../../../../../stores/base/Store";

export default class StudentNumbers extends Store{
    static storeName="StudentNumbers";
    static type = STORE_TYPE.SINGLETON;
    getInitialState(){
        return {
            numbers:[]
        }
    }
    setNumbers(numbers){
        this.state.numbers = numbers;
        this.save();
    }
}