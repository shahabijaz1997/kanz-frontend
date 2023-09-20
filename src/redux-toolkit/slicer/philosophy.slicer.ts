import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../interfaces/redux/redux.interface";
import { Constants } from "../../enums/constants.enum";
import { isEmpty } from "../../utils/object.utils";

const initialState: Data = {
  value: {},
};

export const QuestionnaireSlice = createSlice({
  name: "questionnaireData",
  initialState,
  reducers: {
    saveQuestionnaire: (state, action: PayloadAction<String>) => {
      state.value = action.payload;
    },
    saveAnswer: (state, action: PayloadAction<any>) => {
      const { question, option, lang, textAnswer } = action.payload;
      const existingQuestions = JSON.parse(JSON.stringify(state.value));

      const questionToUpdate = existingQuestions?.questions?.find((item: any) => item.id === question.id);

      if (questionToUpdate && option) {
        const optionsToUpdate = questionToUpdate[lang].options;
        const updatedOptions = optionsToUpdate.map((opt: any) => {
          if (questionToUpdate.question_type === Constants.CHECK_BOX) {
            if (opt.id === option.id) return { ...opt, selected: !option.selected };
            else return { ...opt };
          }
          return { ...opt, selected: opt.id === option.id };
        });
        questionToUpdate[lang].options = updatedOptions;
      } else if (questionToUpdate) {
        questionToUpdate.answer = textAnswer;
      }
      state.value = existingQuestions;
    },
    saveDealSelection: (state, action: PayloadAction<any>) => {
      const { option, question, questions, lang, secIndex, step } = action.payload;
      const existing = JSON.parse(JSON.stringify(state.value));

      if (isEmpty(existing)) {
        question?.options.map((opt: any) => {
          if (opt.question_type === Constants.CHECK_BOX) {
            if (opt.id === option.id) return { ...opt, selected: !option.selected };
            else return { ...opt };
          } else if (opt.question_type === Constants.MULTIPLE_CHOICE) {
            if (opt.id === option.id) return { ...opt, selected: !option.selected };
            else return { ...opt };
          }
          return { ...opt, selected: opt.id === option.id };
        });
        state.value =
          [
            {
              id: step,
              [lang]: {
                sections: [{
                  questions: [{ id: question.id, options: question?.options }]
                }]
              }
            }
          ]
      }
      else {
        const currentStep = existing.find((item: any) => item.id === step);
        const currentSection = currentStep[lang]?.sections[secIndex];
        const currentQuestion = currentSection.questions.find((ques: any) => ques.id === question.id);
        if (currentQuestion.question_type === Constants.CHECK_BOX) {
          currentQuestion?.options.forEach((opt: any) => {
            if (opt.id === option.id) opt.selected = !option.selected;
          });
        }
        else if (currentQuestion.question_type === Constants.MULTIPLE_CHOICE) {
          currentQuestion?.options.map((opt: any) => {
            if (opt.id === option.id) opt.selected = true;
            else opt.selected = false;
          });
        }
        else if (currentQuestion.question_type === Constants.NUMBER_INPUT) {
          currentQuestion.answer = option
        }
        else {
          currentQuestion?.options.map((opt: any) => {
            return { ...opt, selected: opt.id === option.id };
          });
        }
        state.value = existing;
      }
    }
  },
});

export const { saveQuestionnaire, saveAnswer, saveDealSelection } = QuestionnaireSlice.actions;
export default QuestionnaireSlice.reducer;
