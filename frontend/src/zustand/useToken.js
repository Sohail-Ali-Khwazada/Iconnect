import { create } from 'zustand'

const useToken = create((set) => ({
  authToken:JSON.parse(localStorage.getItem("jwt")),
  
  setAuthToken: (newToken) => set({authToken: newToken}),

  clearAuthToken:() => set({authToken: null})
}));

export default useToken;