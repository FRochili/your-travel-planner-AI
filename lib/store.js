import { create } from "zustand";

const useStore = create((set) => ({
    // state variables
    itinerary: null,
    savedItinerary: [],
    loading: false,
    user: null,
    formData: {
        destination: '',
        days: 1,
        travelers: 1,
        budgetMin: 0,
        budgetMax: 0,
        styles: [],
        notes: '',
    },

    //actions to update state
    setItinerary: (itinerary) => set({ itinerary }),
    setSavedItinerary: (savedItinerary) => set({ savedItinerary }),
    setLoading: (loading) => set({ loading }),
    setUser: (user) => set({ user }),
    setFormData: (formData) => set({ formData }),
}))

export default useStore