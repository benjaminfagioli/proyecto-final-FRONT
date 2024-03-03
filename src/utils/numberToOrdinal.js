const numberToOrdinal = (number) => {
  if (number === 1) return "1er";
  if (number === 2) return "2do";
  if (number === 3) return "3er";
  if (number === 4) return "4to";
  if (number === 5) return "5to";
  if (number === 6) return "6to";
  if (number === 7) return "7mo";
  if (number === 8) return "8vo";
  if (number === 9) return "9no";
  if (number === 10) return "10mo";
};
export default numberToOrdinal;
