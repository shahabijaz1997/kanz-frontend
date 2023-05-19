import { getEnv } from "../env";

const ENV = getEnv();
const totalPages = 2;
let data = [
    { question: "What are your investment objectives for this portfolio?", ques: [{ id: 1, title: "Startups" }, { id: 2, title: "Real Estate" }, { id: 3, title: "Equities" }] },
    { question: "What are your preferences to invest in types of assets?", ques: [{ id: 1, title: "Income" }, { id: 2, title: "Total Return" }, { id: 3, title: "Growth" }] }
]

export const getPhilosophyQuestions = (page: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data[page - 1])
                resolve({ status: 200, data: { currentPage: page, totalPages, phil_ques: data[page - 1] } })
            else
                reject({ error: "This information does not exists" })
        }, 1500);
    });
};
