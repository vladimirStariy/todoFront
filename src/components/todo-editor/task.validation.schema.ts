import * as yup from "yup";

export const taskValidationSchema = yup.object().shape({
    taskId: yup.number().required("id"),
    title: yup.string().trim().required("Введите заголовок."),
    description: yup.string().trim().required("Введите описание."),
    status: yup.string().required("Укажите статус."),
});