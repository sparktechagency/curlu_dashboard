export const MakeFormData = (values) => {
    const formData = new FormData();
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            formData.append(key, values[key]);
        }
    }
    return formData;
};