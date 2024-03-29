import {create} from 'zustand'

const useUserStore = create((set) => ({
    user: {},
    studentDetail: {},
    setUser: (user:any) => set((state:any) =>{
        return{
            user: user
        }
    }),
    clearUser: () => set((state:any) => {
        return{
            user: {}
        }
    }),
    setStudentDetail: (student:any) => set((state:any) =>{
        return{
            studentDetail: student
        }
    }),
    updateStudentDetails: async( userData:any) => {
        const {id,department,fullName,regNumber,school,number,course,email} = userData
        
        const response = await fetch(`http://10.0.2.2:8000/api/student/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id:regNumber,
                name:fullName,
                phone:number,
                school:school,
                department:department,
                course:course,
                email:email
            })
        })
        const data = await response.json()
        if(data.status === 'success'){
            set((state:any) => {
                return{
                    user: data.user
                }
            })
        }
    },
    updateLecturerDetails: async( userData:any) => {
        const {id,department,fullName,regNumber,school,number, course, email} = userData
        
        const response = await fetch(`http://10.0.2.2:8000/api/teacher/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacher_id:regNumber,
                name:fullName,
                phone:number,
                school:school,
                department:department,
                course:course,
                email:email
            })
        })
        const data = await response.json()
        if(data.status === 'success'){
            set((state:any) => {
                return{
                    user: data.user
                }
            })
        }
    },

}))

export default useUserStore
