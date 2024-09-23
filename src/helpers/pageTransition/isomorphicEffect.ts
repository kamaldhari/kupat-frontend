import { useEffect, useLayoutEffect } from 'react';

// Define isomorphicEffect as a custom hook that switches between useLayoutEffect and useEffect
const isomorphicEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default isomorphicEffect;
