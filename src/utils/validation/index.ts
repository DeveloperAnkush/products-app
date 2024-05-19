import * as yup from "yup";

const commonMessage = "This field is required!";
const validName = "Enter a valid name!";
const validNumber = "Enter only number!";

const nameExp = /^[A-Za-z]( ?[A-Za-z] ?)*$/;

const nameValidation = yup
  .string()
  .required(commonMessage)
  .matches(nameExp, validName);

export const addEditProductSchema = yup.object().shape({
  productName: nameValidation,
  category: yup.string().required(commonMessage),
  description: yup.string().required(commonMessage),
  expiryDate: yup.string().required(commonMessage),
  costPrice: yup
    .number()
    .required(commonMessage)
    .typeError(validNumber)
    .positive()
    .integer()
    .min(1, "Min cost price is 1"),
  sellPrice: yup
    .number()
    .required(commonMessage)
    .typeError(validNumber)
    .positive()
    .integer()
    .min(1, "Min sell price is 1"),
  discount: yup
    .number()
    .required(commonMessage)
    .typeError(validNumber)
    .positive()
    .integer()
    .min(0, "Min discount is 0")
    .max(100, "Max discount is 100"),
  discountSellPrice: yup.number().required(commonMessage),
  finalPrice: yup.number().required(commonMessage),
});
