export const formatMask = (value: string) => {
  let formattedValue = value.replace(/\D/g, "");
  if (formattedValue.length <= 2) {
    formattedValue = formattedValue.replace(/(\d{2})/, "$1");
  } else if (formattedValue.length <= 4) {
    formattedValue = formattedValue.replace(/(\d{2})(\d{2})/, "$1/$2");
  } else if (formattedValue.length <= 8) {
    formattedValue = formattedValue.replace(
      /(\d{2})(\d{2})(\d{4})/,
      "$1/$2/$3"
    );
  }
  return formattedValue;
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
