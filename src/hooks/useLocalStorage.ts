import {useState, useEffect} from 'react';

export default function useLocalStorage(key: string) {
    const [value, setValue] = useState<string>("init");

    useEffect(() => {
        const res = window.localStorage.getItem(key);
        if (!res) {
            return setValue("local storage is empty");
        }
        setValue(res);
    }, []);

    const setValueAndStrage = (newValue: string) => {
        window.localStorage.setItem(key, newValue);
        setValue(newValue);
    };

    return { value, setValueAndStrage };
}