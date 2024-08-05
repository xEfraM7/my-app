export const useDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses en JS son de 0 a 11
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return { formattedDate };
};
