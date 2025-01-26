import CryptoES from 'crypto-es';

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'default_encryption_key';

type SaveToLocalOptions = {
    isJson?: boolean;
    isEncrypted?: boolean;
};

type GetFromLocalOptions = {
    isJson?: boolean;
    isEncrypted?: boolean;
};

const saveToLocal = (key: string, data: any, options: SaveToLocalOptions = { isJson: true, isEncrypted: false }): void => {
    let saveData: string = data;
    
    if (options.isJson && data) {
        saveData = JSON.stringify(data);
    }
    
    if (options.isEncrypted && saveData) {
        saveData = CryptoES.AES.encrypt(saveData, ENCRYPTION_KEY).toString();
    }
    
    global.localStorage.setItem(key, saveData);
};

const getFromLocal = <T = any>(key: string, options: GetFromLocalOptions = { isJson: true, isEncrypted: false }): T | null => {
    let data = global.localStorage.getItem(key);
    
    if (data && options.isEncrypted) {
        const bytes = CryptoES.AES.decrypt(data, ENCRYPTION_KEY);
        data = bytes.toString(CryptoES.enc.Utf8);
    }
    
    if (data && options.isJson) {
        try {
            return JSON.parse(data) as T;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return null;
        }
    }
    
    return data as T;
};

const removeFromLocal = (key: string): void => {
    global.localStorage.removeItem(key);
};

const removeLocalStorageData = (): void => {
    global.localStorage.clear();
};

export {
    getFromLocal,
    removeFromLocal,
    removeLocalStorageData, saveToLocal
};

