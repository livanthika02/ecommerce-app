export const formatMoney = (n) =>
  "\u20b9" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
