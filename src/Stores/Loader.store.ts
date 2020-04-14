import create from 'zustand';

const [useLoaderStore] = create(set => ({
    loading: false,
    activate: () => set({ loading: true }),
    deactivate: () => set({ loading: false }),
}));

export { useLoaderStore };