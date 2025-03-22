import { FormMockInterview } from "@/components/ui/form-mock-interview"
import { db } from "@/config/firebase.config"
import { Interview } from "@/types"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CreateEditPage = () => {
    const {interviewId} = useParams<{interviewId : string}>()
    const [interview, SetInterview] = useState<Interview | null>(null)

    useEffect(() => {
        const fethcInterview = async() => {
            if (interviewId) {
                try {
                    const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
                if (interviewDoc.exists()){
                    SetInterview({...interviewDoc.data()} as Interview)
                } 
                } catch (error) {
                    console.log(error)
                    
                }
            }
        };
        fethcInterview();
    }, [interviewId])

  return (
    <div className="my-4 flex-col w-full"> 
        <FormMockInterview initialData={interview}/>
     </div>
  )
}
