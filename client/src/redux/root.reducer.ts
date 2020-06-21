import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import courseReducer from "./courses/courses.reducer";

const persistConfif = {
  key: "root",
  storage,
  whitelist: ["courses"],
};

const rootReducer = combineReducers({
  courses: courseReducer,
});

export default persistReducer(persistConfif, rootReducer);
