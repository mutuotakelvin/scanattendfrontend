import { create } from "zustand";


const useAccountStore = create((set) => ({
    account: 'Student',
    login: true,
    setAccount:(accountType:any) => set((state:any) => {
        return {
            account: accountType
        }
    }),
    updateLogin: (loginStatus:any) => set((state:any) => {
        return{
            login: loginStatus
        }
    })
}))

export default useAccountStore