import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResultsObj, createResultApi } from "../api-backend/apis/question";



const useCreateResult = (callFunc:() => void) => {
    //const queryClient = useQueryClient();
    const useResultMutation = useMutation({
        mutationFn: createResultApi,
        onSuccess: (result, varaiables) => {
            console.log({
                result,
                varaiables
            })
        //    queryClient.invalidateQueries({queryKey: ["questions"]});
        alert("Your results are submitted successfully");
        callFunc();
          
        }, 
        onError: (error:any) => {
            console.log(error);
        }
    })

    const handleClick = (data:ResultsObj ) => {
        useResultMutation.mutate({
           ...data
        })
    }
  

    return {
        handleClick
    }
}
 
export default useCreateResult;