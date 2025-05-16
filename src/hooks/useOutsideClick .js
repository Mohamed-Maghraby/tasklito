import { useEffect } from 'react';
/**
 *
 * @param {*} ref - Ref of your parent div
 * @param {*} callback - Callback which can be used to change your maintained state in your component
 */
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback(); //Do what you want to handle in the callback
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
};
export default useOutsideClick;
