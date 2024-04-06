interface IChangeFormatDate {
    date: Date;
    monthFormat?: string;
    language?: string;
    year?: boolean;
}
export const useChangeFormatDate = (params: IChangeFormatDate) => {
    const { date: dateValue , language: language, year: year} = params;

    // Create a new Date object from the input string
    const dateObj = new Date(dateValue);

    // Use toLocaleDateString to format the date
    if (year) {
        const options: any = { day: 'numeric', month: (params.monthFormat ? params.monthFormat : 'short'), year: 'numeric' };
        if (language) {
            options.localeMatcher = 'lookup';
            options.locale = language;
            return dateObj.toLocaleDateString(language, options);
        } else {
            return dateObj.toLocaleDateString('en-US', options);
        }
    }
    const options: any = { day: 'numeric', month: (params.monthFormat ? params.monthFormat : 'short') };
    if (language) {
        options.localeMatcher = 'lookup';
        options.locale = language;
        return dateObj.toLocaleDateString(language, options);
    } else {
        return dateObj.toLocaleDateString('en-US', options);
    }


};
