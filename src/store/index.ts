// import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';
import { createUserSlice, type UserSlice } from './slices/user';

interface IStore extends UserSlice {
}

// export const useStore = create<IStore>((...a) => ({
//   ...createUserSlice(...a),
// }));

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api)
    }),
    { name: 'xpadGame', storage: createJSONStorage(() => localStorage) },
  ),
);

// mountStoreDevtool('ZuStandStore', useStore);

export const useSelector = createSelectors(useStore);
