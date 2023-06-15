import { useLayoutEffect } from "react";
import RouterModule from "./modules/Router/router.module";
import { useDispatch, useSelector } from "react-redux";
import { saveOrientation } from "./redux-toolkit/slicer/orientation.slicer";
import { RootState } from "./redux-toolkit/store/store";

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          const newDirValue: any = document.documentElement.getAttribute('dir');
          dispatch(saveOrientation(newDirValue));
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return <RouterModule />
}

export default App;