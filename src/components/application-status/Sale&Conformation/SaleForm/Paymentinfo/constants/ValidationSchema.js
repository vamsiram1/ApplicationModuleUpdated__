import * as Yup from "yup";
 
// Validation schema that validates based on selected payment mode
export const createPaymentValidationSchema = (selectedPaymentMode) => {
  const modeToId = {
    'Cash': 1,
    'DD': 2,
    'Cheque': 3,
    'Credit/Debit Card': 4
  };
  const payModeId = modeToId[selectedPaymentMode] || 1;
 
  return Yup.object().shape({
    // Cash payment fields
    paymentDate: selectedPaymentMode === 'Cash'
      ? Yup.date().required("Payment Date is required")
      : Yup.date().nullable(),
    amount: selectedPaymentMode === 'Cash'
      ? Yup.string()
          .required("Amount is required")
          .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      : Yup.string().nullable(),
    receiptNumber: selectedPaymentMode === 'Cash'
      ? Yup.string()
          .trim()
          .matches(/^\d{9}$/, "Pre Printed Receipt No must be exactly 9 digits")
          .required("Pre Printed Receipt No is required")
      : Yup.string().nullable(),
   
    // DD payment fields
    mainDdPayDate: selectedPaymentMode === 'DD'
      ? Yup.date().required("Payment Date is required")
      : Yup.date().nullable(),
    mainDdAmount: selectedPaymentMode === 'DD'
      ? Yup.string()
          .required("Amount is required")
          .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      : Yup.string().nullable(),
    mainDdReceiptNumber: selectedPaymentMode === 'DD'
      ? Yup.string()
          .trim()
          .matches(/^\d{9}$/, "Pre Printed Receipt No must be exactly 9 digits")
          .required("Pre Printed Receipt No is required")
      : Yup.string().nullable(),
    mainDdNumber: selectedPaymentMode === 'DD'
      ? Yup.string().required("DD Number is required")
      : Yup.string().nullable(),
    mainDdDate: selectedPaymentMode === 'DD'
      ? Yup.date().required("DD Date is required")
      : Yup.date().nullable(),
    mainDdOrganisationName: selectedPaymentMode === 'DD'
      ? Yup.string().required("Organisation Name is required")
      : Yup.string().nullable(),
    mainDdBankName: selectedPaymentMode === 'DD'
      ? Yup.string().required("Bank Name is required")
      : Yup.string().nullable(),
    mainDdBranchName: selectedPaymentMode === 'DD'
      ? Yup.string().required("Branch Name is required")
      : Yup.string().nullable(),
    mainDdIfscCode: selectedPaymentMode === 'DD'
      ? Yup.string().required("IFSC Code is required")
      : Yup.string().nullable(),
    mainDdCityName: selectedPaymentMode === 'DD'
      ? Yup.string().required("City Name is required")
      : Yup.string().nullable(),
   
    // Cheque payment fields
    mainChequePayDate: selectedPaymentMode === 'Cheque'
      ? Yup.date().required("Payment Date is required")
      : Yup.date().nullable(),
    mainChequeAmount: selectedPaymentMode === 'Cheque'
      ? Yup.string()
          .required("Amount is required")
          .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      : Yup.string().nullable(),
    mainChequeReceiptNumber: selectedPaymentMode === 'Cheque'
      ? Yup.string()
          .trim()
          .matches(/^\d{9}$/, "Pre Printed Receipt No must be exactly 9 digits")
          .required("Pre Printed Receipt No is required")
      : Yup.string().nullable(),
    mainChequeNumber: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("Cheque Number is required")
      : Yup.string().nullable(),
    mainChequeDate: selectedPaymentMode === 'Cheque'
      ? Yup.date().required("Cheque Date is required")
      : Yup.date().nullable(),
    mainChequeOrganisationName: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("Organisation Name is required")
      : Yup.string().nullable(),
    mainChequeBankName: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("Bank Name is required")
      : Yup.string().nullable(),
    mainChequeBranchName: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("Branch Name is required")
      : Yup.string().nullable(),
    mainChequeIfscCode: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("IFSC Code is required")
      : Yup.string().nullable(),
    mainChequeCityName: selectedPaymentMode === 'Cheque'
      ? Yup.string().required("City Name is required")
      : Yup.string().nullable(),
   
    // Credit/Debit Card payment fields
    cardPayDate: selectedPaymentMode === 'Credit/Debit Card'
      ? Yup.date().required("Payment Date is required")
      : Yup.date().nullable(),
    cardAmount: selectedPaymentMode === 'Credit/Debit Card'
      ? Yup.string()
          .required("Amount is required")
          .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      : Yup.string().nullable(),
    cardReceiptNumber: selectedPaymentMode === 'Credit/Debit Card'
      ? Yup.string()
          .trim()
          .matches(/^\d{9}$/, "Pre Printed Receipt No must be exactly 9 digits")
          .required("Pre Printed Receipt No is required")
      : Yup.string().nullable(),
   
    // Optional fields
    remarks: Yup.string().nullable(),
    proCreditCard: Yup.boolean().nullable()
  });
};