import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../interfaces/redux/redux.interface";

const initialState: Data = {
    value: {}
}

export const PhilosophySlice = createSlice({
    name: 'philosophyData',
    initialState,
    reducers: {
        savePhilosophyData: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        },
        saveAnswer: (state, action: PayloadAction<any>) => {
            const { question, option, lang } = action.payload;
            const existingQuestions = JSON.parse(JSON.stringify(state.value));
          
            const questionToUpdate = existingQuestions.questions.find(
              (item: any) => item.id === question.id
            );
          
            if (questionToUpdate) {
              const optionsToUpdate = questionToUpdate[lang].options;
          
              const updatedOptions = optionsToUpdate.map((opt: any) => ({
                ...opt,
                selected: opt.id === option.id,
              }));
          
              questionToUpdate[lang].options = updatedOptions;
            }
          
            state.value = existingQuestions;
          }
          
          
    }
});

export const { savePhilosophyData, saveAnswer } = PhilosophySlice.actions;
export default PhilosophySlice.reducer;