import en from "../assets/resources/languages/en.json";

const loadLanguage = (language: String) => {
    const languages = [{ name: 'en', val: en }];
    let preferred = languages.find(lg => lg.name === language)?.val;
    return preferred || en;

}
export default loadLanguage;