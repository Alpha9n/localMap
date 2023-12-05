import {useState, useEffect} from 'react';

export default function useLocalStorage(key: string, initialValue?: string) {
    const [value, setValue] = useState<string>(initialValue??'');

    useEffect(() => {
        const res = window.localStorage.getItem(key);
        if (!res) {
            return setValue(initialValue??'');
        }
        setValue(res);
    }, [key, value]);

    const setValueAndStrage = (newValue: string): undefined => {
        window.localStorage.setItem(key, newValue);
        setValue(newValue);
    };

    return {value, setValueAndStrage};
}