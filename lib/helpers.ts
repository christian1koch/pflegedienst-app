export const getGeschlecht = (geschlecht: string) => {
  if (geschlecht === "m") return "männlich";
  if (geschlecht === "f") return "weiblich";
  return "divers";
};
