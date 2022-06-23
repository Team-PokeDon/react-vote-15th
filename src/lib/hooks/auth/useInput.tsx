import useLocalStorage from './useLocalStorage';

function useInput(key: any, initValue: any) {
  const [value, setValue] = useLocalStorage(key, initValue);
  const reset = () => setValue(initValue);
  const attributeObj = {
    value,
    onChange: (e: any) => setValue(e.target.value),
  };
  return [value, reset, attributeObj];
}

export default useInput;
