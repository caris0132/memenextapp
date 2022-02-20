import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
const makeStore = () => createStore(rootReducer);
export const wrapper = createWrapper(makeStore);