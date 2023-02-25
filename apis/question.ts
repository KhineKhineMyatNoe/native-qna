import { defaultError } from "../helpers/errors";
import { quesBaseURL } from "../lib/baseURL";

export interface QuestionObj{
    id: number;
    attributes: {
      question: string;
      choices: any;
      answer: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    }
  }
  
export interface AnswerExtendObj extends QuestionObj{
    user_answer: string | null;
}
  export interface ResultsObj {
    user: number;
    answer : Array<AnswerExtendObj>;
        
  }
  export const createResultApi = async (props:ResultsObj) => {
    const body =  { 
      data: {...props}
    }
    try {
      const response = await quesBaseURL.post("api/results",body); 
      if(response.status == 200){
        return response.data.data as QuestionObj; 
      }
      throw defaultError;
    } catch (error) {
      throw defaultError;
    }
    throw defaultError;
  }
  

  export const questionApi = async () => {
    
    try {
        const response = await quesBaseURL.get("api/questions/");
        if(response.status == 200) {
           return response.data.data as Array<QuestionObj>;
        }
        throw defaultError;
    } catch (error) {
        throw defaultError;
    }
    throw defaultError;
}



