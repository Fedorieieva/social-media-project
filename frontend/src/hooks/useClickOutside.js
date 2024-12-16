import {useEffect} from "react";

/**
 * Custom hook to detect clicks outside the provided reference element.
 * @param {Ref} ref - The reference to the element to monitor for outside clicks.
 * @param {Function} callback - The callback function to execute when a click outside is detected.
 */
const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOutside;
