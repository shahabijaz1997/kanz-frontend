import { useLayoutEffect } from "react";
import RouterModule from "./modules/Router/router.module";
import { useDispatch } from "react-redux";
import { saveOrientation } from "./redux-toolkit/slicer/orientation.slicer";

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          const newDirValue: any = document.documentElement.getAttribute('dir');
          console.log(newDirValue);
          
          dispatch(saveOrientation(newDirValue));
        }
      }
    });

    // Start observing the dir attribute of document.documentElement
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  return <RouterModule />
}

export default App;