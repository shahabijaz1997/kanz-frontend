import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../interfaces/redux/redux.interface";
import { CHECK_BOX } from "../../utils/constants";

const initialState: Data = {
  value: {},
};

export const PhilosophySlice = createSlice({
  name: "philosophyData",
  initialState,
  reducers: {
    savePhilosophyData: (state, action: PayloadAction<String>) => {
      state.value = action.payload;
    },
    saveAnswer: (state, action: PayloadAction<any>) => {
        const { question, option, lang,textAnswer } = action.payload;
        const existingQuestions = JSON.parse(JSON.stringify(state.value));
      
        const questionToUpdate = existingQuestions.questions.find(
          (item: any) => item.id === question.id
        );
      
        if (questionToUpdate && option) {
          const optionsToUpdate = questionToUpdate[lang].options;
          const updatedOptions = optionsToUpdate.map((opt: any) => {
            if (questionToUpdate.question_type === CHECK_BOX) {
                if(opt.id === option.id){
                    return { ...opt,selected:!option.selected };
                }else return { ...opt };
            }
            return {
              ...opt,
              selected: opt.id === option.id,
            };
          });
          questionToUpdate[lang].options = updatedOptions;
        }else if(textAnswer && questionToUpdate){
          questionToUpdate.answer = textAnswer;
        }
        state.value = existingQuestions;
      }
      
  },
});

export const { savePhilosophyData, saveAnswer } = PhilosophySlice.actions;
export default PhilosophySlice.reducer;
