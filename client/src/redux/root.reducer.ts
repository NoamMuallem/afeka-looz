import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import courseReducer from "./courses/courses.reducer";
import UiReducer from "./ui/ui.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["courses"],
  blacklist: ["ui"],
};

const rootReducer = combineReducers({
  courses: courseReducer,
  ui: UiReducer,
});

export default persistReducer(persistConfig, rootReducer);
