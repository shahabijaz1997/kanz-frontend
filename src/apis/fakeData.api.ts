import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();
const totalPages = 2;
let data = [
    { question: "What are your investment objectives for this portfolio?", ques: [{ id: 1, title: "Startups" }, { id: 2, title: "Real Estate" }, { id: 3, title: "Equities" }] },
    { question: "What are your preferences to invest in types of assets?", ques: [{ id: 1, title: "Income" }, { id: 2, title: "Total Return" }, { id: 3, title: "Growth" }] }
];
const businessIndustries = [
    { id: 1, name: "Accounting" },
    { id: 2, name: "Advertising" },
    { id: 3, name: "Aerospace" },
    { id: 4, name: "Agriculture" },
    { id: 5, name: "Apparel & Fashion" },
    { id: 6, name: "Architecture" },
    { id: 7, name: "Automotive" },
    { id: 8, name: "Banking" },
    { id: 9, name: "Biotechnology" },
    { id: 10, name: "Chemical" },
    { id: 11, name: "Computer Hardware" },
    { id: 12, name: "Computer Networking" },
    { id: 13, name: "Computer Software" },
    { id: 14, name: "Construction" },
    { id: 15, name: "Consumer Electronics" },
    { id: 16, name: "Consumer Goods" },
    { id: 17, name: "Consumer Services" },
    { id: 18, name: "Cosmetics" },
    { id: 19, name: "Defense & Space" },
    { id: 20, name: "Education Management" },
    { id: 21, name: "E-learning" },
    { id: 22, name: "Electrical & Electronic Manufacturing" },
    { id: 23, name: "Entertainment" },
    { id: 24, name: "Environmental Services" },
    { id: 25, name: "Events Services" },
    { id: 26, name: "Financial Services" },
    { id: 27, name: "Food & Beverage" },
    { id: 28, name: "Food Production" },
    { id: 29, name: "Fundraising" },
    { id: 30, name: "Furniture" },
    { id: 31, name: "Gambling & Casinos" },
    { id: 32, name: "Government Administration" },
    { id: 33, name: "Health, Wellness & Fitness" },
    { id: 34, name: "Hospital & Health Care" },
    { id: 35, name: "Hospitality" },
    { id: 36, name: "Human Resources" },
    { id: 37, name: "Import & Export" },
    { id: 38, name: "Individual & Family Services" },
    { id: 39, name: "Industrial Automation" },
    { id: 40, name: "Information Services" },
    { id: 41, name: "Information Technology & Services" },
    { id: 42, name: "Insurance" },
    { id: 43, name: "Internet" },
    { id: 44, name: "Legal Services" },
    { id: 45, name: "Logistics & Supply Chain" },
    { id: 46, name: "Luxury Goods & Jewelry" },
    { id: 47, name: "Machinery" },
    { id: 48, name: "Management Consulting" },
    { id: 49, name: "Manufacturing" },
    { id: 50, name: "Market Research" },
    { id: 51, name: "Marketing & Advertising" },
    { id: 52, name: "Media Production" },
    { id: 53, name: "Medical Devices" },
    { id: 54, name: "Medical Practice" },
    { id: 55, name: "Mining & Metals" },
    { id: 56, name: "Nonprofit Organization Management" },
    { id: 57, name: "Oil & Energy" },
    { id: 58, name: "Online Media" },
    { id: 59, name: "Outsourcing/Offshoring" },
    { id: 60, name: "Package/Freight Delivery" },
    { id: 61, name: "Packaging & Containers" },
    { id: 62, name: "Pharmaceuticals" },
    { id: 63, name: "Photography" },
    { id: 64, name: "Printing" },
    { id: 65, name: "Professional Training & Coaching" },
    { id: 66, name: "Public Relations & Communications" },
    { id: 67, name: "Publishing" },
    { id: 68, name: "Real Estate" },
    { id: 69, name: "Research" },
    { id: 70, name: "Restaurants" },
    { id: 71, name: "Retail" },
    { id: 72, name: "Security & Investigations" },
    { id: 73, name: "Semiconductors" },
    { id: 74, name: "Shipbuilding" },
    { id: 75, name: "Sporting Goods" },
    { id: 76, name: "Sports" },
    { id: 77, name: "Staffing & Recruiting" },
    { id: 78, name: "Telecommunications" },
    { id: 79, name: "Textiles" },
    { id: 80, name: "Translation & Localization" },
    { id: 81, name: "Transportation/Trucking/Railroad" },
    { id: 82, name: "Travel & Tourism" },
    { id: 83, name: "Utilities" },
    { id: 84, name: "Venture Capital & Private Equity" },
    { id: 85, name: "Veterinary" },
    { id: 86, name: "Warehousing" },
    { id: 87, name: "Wholesale" },
    { id: 88, name: "Wine & Spirits" },
    { id: 89, name: "Wireless" },
    { id: 90, name: "Writing & Editing" },
    { id: 91, name: "Other" },
    { id: 92, name: "Renewable & Environment" },
    { id: 93, name: "Information & Communication Technology" },
    { id: 94, name: "Data & Analytics" },
    { id: 95, name: "Digital Marketing" },
    { id: 96, name: "Design" },
    { id: 97, name: "E-commerce" },
    { id: 98, name: "Financial Technology" },
    { id: 99, name: "Health Technology" },
    { id: 100, name: "Legal" },
];

const regions = [
    { id: 1, name: "Asia" },
    { id: 2, name: "Europe" },
    { id: 3, name: "North America" },
    { id: 4, name: "South America" },
    { id: 5, name: "Africa" },
    { id: 6, name: "Oceania" },
    { id: 7, name: "Antarctica" }
];

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

export const getAllIndustries = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 200, data: { business: businessIndustries } });
        }, 100);
    });
};

export const getAllRegions = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 200, data: { regions } });
        }, 100);
    });
};
