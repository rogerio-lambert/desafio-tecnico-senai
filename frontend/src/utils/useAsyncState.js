import  { useState } from "react";

function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = (newState) =>(
    new Promise((resolve) => {
      setValue(newState);
      resolve(newState);
    })
  )
  return [value, setter];
}

export default useAsyncState;