import { useLayoutEffect } from "react";
import RouterModule from "./modules/Router/router.module";

function App() {
  useLayoutEffect(() => {
    let clearFlag = localStorage.getItem("clearFlag");
    if (!clearFlag) {
      localStorage.clear();
      localStorage.setItem("clearFlag", "true");
    }
  }, []);

  return <RouterModule />
}

export default App;