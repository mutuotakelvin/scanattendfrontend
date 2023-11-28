import {create} from 'zustand'

const useExamStore = create((set) => ({
    exams: [],
    selectedExam: null,
    setExams: (exams:any) => set((state:any) =>{
        return{
            exam: exams
        }
    }),
    setSelectedExam: (exam:any) => set((state:any) =>{
        return{
            selectedExam: exam
        }
    }),
}))

export default useExamStore