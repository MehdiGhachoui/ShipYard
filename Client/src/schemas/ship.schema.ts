import * as yup from "yup";

export const shipValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    length: yup.number().required("Length is required"),
    width: yup.number().required("Width is required"),
    code: yup.string().required("Code is required").matches(new RegExp("^[A-Z]{4}\-[0-9]{4}\-[A-Z][0-9]$"), { message: "Please enter valid code.", excludeEmptyString: false }),
});
