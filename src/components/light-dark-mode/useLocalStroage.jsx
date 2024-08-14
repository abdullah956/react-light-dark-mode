import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  // Initialize state with a value from local storage or a default value
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      // Try to get the item from local storage and parse it
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      // If there's an error (e.g., invalid JSON), use the default value
      console.log(error);
      currentValue = defaultValue;
    }

    return currentValue;
  });

  // Update local storage whenever the value or key changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the current value and a function to update it
  return [value, setValue];
}
