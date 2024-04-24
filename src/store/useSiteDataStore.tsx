import {create} from "zustand";
import { isEqual } from "lodash";
import { TEMPLATE_DATA } from "../template/a/";
import { FormData, ContentItem, CTA } from "../template/a/interfaces";

interface SiteDataStore {
  originalData: FormData;
  siteData: FormData;
  hasChanged: boolean;
  groupName: string;
  setGroupName: (groupName: string) => void;
  setOriginalData: (data: FormData) => void;
  setFormData: (
    data: FormData | ((prevFormData: FormData) => FormData)
  ) => void;
  resetData: () => void;
  updateContentItem: (
    index: number | string,
    parameterName: keyof ContentItem | keyof CTA,
    value: any,
    ctaIndex?: number
  ) => void;
  setMenuRoute: (file: string, index: number) => void;
}

const useSiteDataStore = create<SiteDataStore>((set, get) => ({
  originalData: TEMPLATE_DATA,
  siteData: TEMPLATE_DATA,
  hasChanged: false,
  groupName: '',
  setGroupName: (groupName: string)=>set({groupName}),

  setOriginalData: (data) => set({ originalData: data }),

  setFormData: (data) => {
    const newData = typeof data === "function" ? data(get().siteData) : data;
    set({
      siteData: newData,
      hasChanged: !isEqual(get().originalData, newData),
    });
  },

  resetData: () => set({ siteData: get().originalData }),

  updateContentItem: (index, parameterName, value, ctaIndex) => {
    set((state) => {
      if (
        typeof index === "string" &&
        index === "header" &&
        typeof ctaIndex === "number" &&
        state.siteData.header?.ctaList
      ) {
        const updatedCtas = state.siteData.header.ctaList.map((cta, idx) =>
          idx === ctaIndex ? { ...cta, [parameterName]: value } : cta
        );
        return {
          siteData: {
            ...state.siteData,
            header: {
              ...state.siteData.header,
              ctaList: updatedCtas,
            },
          },
        };
      } else if (typeof index === "number" && state.siteData.content) {
        const updatedContent = state.siteData.content.map((item, idx) => {
          if (idx !== index) return item;
          if (
            "ctaList" in item &&
            item.ctaList &&
            typeof ctaIndex === "number"
          ) {
            const updatedCtas = item.ctaList.map((cta, ctaIdx) =>
              ctaIdx === ctaIndex ? { ...cta, [parameterName]: value } : cta
            );
            return { ...item, ctaList: updatedCtas };
          }
          return { ...item, [parameterName]: value };
        });
        return { siteData: { ...state.siteData, content: updatedContent } };
      }
      return {}; // If neither condition is met, return unchanged state
    });
  },

  setMenuRoute: (file, index) =>
    set((state) => ({
      siteData: { ...state.siteData, menuRoute: `${file}-${index}` }, // Assuming menuRoute is a string, concatenate file and index
    })),
}));

export default useSiteDataStore;
