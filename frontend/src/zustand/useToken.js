import { create } from 'zustand'

const useToken = create((set) => ({
  authToken: null,
  
  setAuthToken: (newToken) => set({authToken: newToken}),

  clearAuthToken:() => set({authToken: null})
}));

export default useToken;