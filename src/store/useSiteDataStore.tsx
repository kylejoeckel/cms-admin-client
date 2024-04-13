import create from 'zustand';
import { isEqual } from 'lodash';
import { TEMPLATE_DATA } from '../template/a/';
import { FormData, ContentItem, CTA } from '../template/a/interfaces';

// Define the state and actions for your store
interface SiteDataStore {
    originalData: FormData;
    formData: FormData;
    hasChanged: boolean;
    setOriginalData: (data: FormData) => void;
    setFormData: (data: FormData | ((prevFormData: FormData) => FormData)) => void;
    resetData: () => void;
    updateContentItem: (index: number, parameterName: keyof ContentItem | keyof CTA, value: any, ctaIndex?: number) => void;
    setMenuRoute: (file: string, index: number) => void;
}

const useSiteDataStore = create<SiteDataStore>((set, get) => ({
    originalData: TEMPLATE_DATA,
    formData: TEMPLATE_DATA,
    hasChanged: false,

    setOriginalData: (data) => set({ originalData: data }),

    setFormData: (data) => {
        const newData = typeof data === 'function' ? data(get().formData) : data;
        set({ formData: newData, hasChanged: !isEqual(get().originalData, newData) });
    },

    resetData: () => {
        const original = get().originalData;
        set({ formData: original });
    },

    updateContentItem: (index, parameterName, value, ctaIndex) => {
        set(state => ({
            formData: {
                ...state.formData,
                content: state.formData.content.map((item: ContentItem, idx: number) => {
                    if (idx !== index) return item;
                    if (typeof ctaIndex !== 'undefined' && 'ctaList' in item) {
                        const updatedCtas = item.ctaList.map((cta: CTA, ctaIdx: number) =>
                            ctaIdx === ctaIndex ? { ...cta, [parameterName]: value } : cta
                        );
                        return { ...item, ctaList: updatedCtas };
                    }
                    return { ...item, [parameterName]: value as any };
                })
            }
        }));
    },

    setMenuRoute: (file, index) => {
        set(state => ({
            formData: { ...state.formData, menuRoute: file }
        }));
    }
}));

export default useSiteDataStore;
