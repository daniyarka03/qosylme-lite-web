interface IChangeFormatDate {
    date: Date;
    monthFormat?: string;
    language?: string;
}
export const useChangeFormatDate = (params: IChangeFormatDate) => {
    const { date: dateValue , language: language} = params;

    // Create a new Date object from the input string
    const dateObj = new Date(dateValue);

    // Use toLocaleDateString to format the date
    const options: any = { day: 'numeric', month: (params.monthFormat ? params.monthFormat : 'short') };
    if (language) {
        options.localeMatcher = 'lookup';
        options.locale = language;
        return dateObj.toLocaleDateString(language, options);
    } else {
        return dateObj.toLocaleDateString('en-US', options);
    }


};
