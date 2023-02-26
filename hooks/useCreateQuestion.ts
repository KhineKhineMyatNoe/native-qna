import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler } from "react";
import { createQuestionApi, QuestionCreateProps } from "../api-backend/apis/question";


const useCreateQuestion = (goBack?:() =>void) => {
    const queryClient = useQueryClient();
    const createQuestionMutation = useMutation({
        mutationFn: createQuestionApi,
        onSuccess: (result, varaiables) => {
            console.log({
                result,
                varaiables
            })
            alert("Question created successfully");
            queryClient.invalidateQueries({queryKey:["questions"]});
            if(goBack){
                goBack();
            }
        },
        onError: (error:any) => {
            console.log(error);
        }
    })
    

    const handleSubmit = (createData: QuestionCreateProps) => {
      
        if(createData){
            createQuestionMutation.mutate({
                ...createData
            })
        }
     

       
    }

    return {
        handleSubmit,
        isLoading: createQuestionMutation.isLoading
    }
}

export default useCreateQuestion;