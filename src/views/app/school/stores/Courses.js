import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import { STORE_TYPE } from "../../../../stores/base/Store";
import SchoolFilterForm from "./SchoolFilterForm";

export default class Courses extends PaginatedRemoteStore {
  static storeName = "Courses";
  static type = STORE_TYPE.SINGLETON;

  getAllowedParams() {
    return ["category"];
  }
  getFilterForm(){
    return SchoolFilterForm.get();  
  }
  getUrl() {
    return `school/courses/`;
  }
}
