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
    try {
        let saveData: string = data;
        
        if (options.isJson && data) {
            saveData = JSON.stringify(data);
        }
        
        if (options.isEncrypted && saveData) {
            saveData = CryptoES.AES.encrypt(saveData, ENCRYPTION_KEY).toString();
        }
        
        // Ensure localStorage is available and handle errors if not
        if (typeof global.localStorage !== 'undefined') {
            global.localStorage.setItem(key, saveData);
        } else {
            console.error('localStorage is not available in this environment.');
        }
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const getFromLocal = <T = any>(key: string, options: GetFromLocalOptions = { isJson: true, isEncrypted: false }): T | null => {
    try {
        let data = global.localStorage.getItem(key);

        if (!data) {
            console.warn(`No data found for key: ${key}`);
            return null;
        }
        
        if (options.isEncrypted) {
            try {
                const bytes = CryptoES.AES.decrypt(data, ENCRYPTION_KEY);
                data = bytes.toString(CryptoES.enc.Utf8);
            } catch (decryptError) {
                console.error('Error decrypting data:', decryptError);
                return null;
            }
        }
        
        if (options.isJson) {
            try {
                return JSON.parse(data) as T;
            } catch (jsonParseError) {
                console.error('Error parsing JSON:', jsonParseError);
                return null;
            }
        }
        
        return data as T;
    } catch (error) {
        console.error('Error retrieving from localStorage:', error);
        return null;
    }
};

const removeFromLocal = (key: string): void => {
    try {
        if (typeof global.localStorage !== 'undefined') {
            global.localStorage.removeItem(key);
        } else {
            console.error('localStorage is not available in this environment.');
        }
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

const removeLocalStorageData = (): void => {
    try {
        if (typeof global.localStorage !== 'undefined') {
            global.localStorage.clear();
        } else {
            console.error('localStorage is not available in this environment.');
        }
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

export {
    getFromLocal,
    removeFromLocal,
    removeLocalStorageData,
    saveToLocal
};
