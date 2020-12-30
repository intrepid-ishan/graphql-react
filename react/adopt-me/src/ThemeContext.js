import { createContext } from 'react';

// createContext is a function that returns an object with two React components in it: a Provider and a Consumer
const ThemeContext = createContext(["green", () => { }]);

export default ThemeContext;