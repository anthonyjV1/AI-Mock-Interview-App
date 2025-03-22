import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Interview } from "@/types"
import { CustomBreadCrumb } from "./custom-bread-crumb"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { toast } from "sonner"
import { Button } from "./button"
import { Loader, Trash2 } from "lucide-react"
import { Headings } from "./headings"
import { Separator } from "./separator"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input"
import { Textarea } from "./textarea"

interface FormMockInterviewProps{
    initialData : Interview |null
}

const formSchema = z.object({
  position: z
  .string()
  .min(1, "Position is required")
  .max(100, "Position must be 100 characters or less"),
description: z.string().min(10, "Description is required"),
experience: z.coerce
  .number()
  .min(0, "Experience cannot be empty or negative"),
techStack: z.string().min(1, "Tech stack must be at least a character"),
})

type FormData = z.infer<typeof formSchema>

export const FormMockInterview = ({initialData} : FormMockInterviewProps) => {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues : initialData || {}
    });

    const { isValid, isSubmitting } = form.formState
    const [ loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { userId } = useAuth()

    const title = initialData?.position ? initialData?.position : "Create a new Mock Interview";

  const breadCrumbPage = initialData?.position ? "Edit" : "Create";

  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

    const onSubmit = async (data : FormData) => {
      try {
        setLoading(true)
        console.log(data)
      } catch (error) {
        console.log(error);
        toast.error("Error..", {
          description: "Something went wrong. Please try again late"
        });
      }finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      if(initialData){
        form.reset({
          position : initialData.position,
          description : initialData.description,
          experience: initialData.experience,
          techStack : initialData.techStack
        })
      }
    }, [initialData, form])

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumbPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "generate"}]}
      />


      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title = {title} isSubHeading/>

        {initialData && (
          <Button size = {"icon"} variant={"ghost"}>
            <Trash2 className="min-w-4 min-h-4 text-red-500"/>
          </Button>
        )}
      </div>

      <Separator className="my-4"/>

      <div className="my-6"></div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md">
        <FormField 
        control= {form.control}
        name="position"
        render={({field}) => (
          <FormItem className="w-full space-y-4">
            <div className="w-full flex items-center justify-between">
              <FormLabel>Job Role / Job Position</FormLabel>
              <FormMessage className="text-sm"/>
            </div>

            <FormControl>
              <Input
              disabled={loading}
              className="h-12"
              placeholder="eg: -Full Stack developer"
              {...field}
              value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
        />

        {/* description */}

        <FormField 
        control= {form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="w-full space-y-4">
            <div className="w-full flex items-center justify-between">
              <FormLabel>Job description</FormLabel>
              <FormMessage className="text-sm"/>
            </div>

            <FormControl>
              <Textarea
              {...field}
              disabled={loading}
              className="h-12"
              placeholder="eg: -describe your job role or postion..."
              value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
        />

        {/* experience */}
        <FormField 
        control= {form.control}
        name="experience"
        render={({field}) => (
          <FormItem className="w-full space-y-4">
            <div className="w-full flex items-center justify-between">
              <FormLabel>Years of Experience</FormLabel>
              <FormMessage className="text-sm"/>
            </div>

            <FormControl>
              <Input
              {...field}
              type="number"
              disabled={loading}
              className="h-12"
              placeholder="eg: -5 years (only the number)"
              value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
        />

<FormField 
        control= {form.control}
        name="techStack"
        render={({field}) => (
          <FormItem className="w-full space-y-4">
            <div className="w-full flex items-center justify-between">
              <FormLabel>Tech Stacks</FormLabel>
              <FormMessage className="text-sm"/>
            </div>

            <FormControl>
              <Textarea
              {...field}
              disabled={loading}
              className="h-12"
              placeholder="eg: -React, Typescript... (Seperate the values using comma)"
              value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
        />

        <div className="w-full flex items-center justify-end gap-6">
          <Button type="reset" size={"sm"} variant={"outline"} disabled={isSubmitting || loading}>Reset</Button>

          <Button type="reset" size={"sm"} disabled={isSubmitting || loading || !isValid}>{loading ? (<Loader className="text-gray-50 animate-spin"/>) : (actions)}</Button>
        </div>
        </form>
      </FormProvider>
    </div>
  )
}
