const LOCAL_STORE = {
  accessToken: 'accessToken',
  refreshAccessToken: 'refreshAccessToken',
  walletAddress: 'walletAddress',
  userName: 'userName',
  user: 'user',
} as const;

export type ILocalStorageValues = {
  accessToken: string;
  refreshAccessToken: string;
  walletAddress: string;
  userName: string;
  user: any;
};

type ILocalStorage = keyof typeof LOCAL_STORE;

type ILocalStorageKeys = (typeof LOCAL_STORE)[ILocalStorage];

const storage = {
  get: <T extends ILocalStorageKeys>(key: T): ILocalStorageValues[T] | undefined => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return undefined;
      }
      return JSON.parse(serialized);
    } catch (err) {
      return undefined;
    }
  },
  set: <T extends ILocalStorageKeys>(key: T, value: ILocalStorageValues[T]) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error(err);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  },
};

export default storage;
