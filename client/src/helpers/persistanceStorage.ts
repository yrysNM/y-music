export const getItem = <T>(key: string): T | null => {
    try {
        return JSON.parse(localStorage.getItem(key)!);
    }catch(e) {
        console.log(`Error getting data from localsotrage`, e);
        return null;
    }
}

export const setItem = <DATATYPE>(key: string, data: DATATYPE): void=> {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }catch(e) {
        console.log(`Error soving data in localstorage`, e);
    }
}