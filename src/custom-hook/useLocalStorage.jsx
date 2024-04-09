import { useCallback, useEffect, useRef, useState } from 'react';
import { redirect } from 'react-router-dom';

/**
 * TODO: Write test for Date type error handling.
 *
 * This wraps a common pattern in our code base: to define a state, and sync that state
 * to AsyncStorage.
 *
 * If defaultValue is given, in case there is no value in the storage, it will be set
 * with defaultValue. Notice that it still returns undefined in the first render to
 * indicate that it is loading the data.
 *
 * @param key The storage key.
 * @param defaultValue The default value of the state.
 *
 * @example
 * const [visible, setVisible] = useStorageState('A_STORAGE_KEY', false);
 */
export const useStorageState = (key, defaultValue, storage = localStorage) => {
  const [value, setValue] = useState();

  useEffect(() => {
    (async () => {
      const result = storage.getItem(key);
      if (result) {
        setValue(JSON.parse(result));
      } else {
        if (defaultValue || defaultValue === 'boolean') {
          setValue(defaultValue);
          storage.setItem(key, JSON.stringify(defaultValue));
        }
      }
    })();
  }, [key]);

  const updateValue = useCallback(
    (value) => {
      if (!value && typeof value !== 'boolean') {
        throw 'Unable to use Date type here! Handle it yourself.';
      }
      setValue(value);
      storage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  return [value, updateValue];
};
