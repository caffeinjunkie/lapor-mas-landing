export const formatDate = (dateString: string) => {
  const cleanedDateString = dateString.replace(/\[.*\]$/, "");

  const date: Date = new Date(cleanedDateString);

  const options: any = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour12: false,
  };

  const formattedDate = date.toLocaleString("id-ID", options);

  console.log(formattedDate, "tes");

  return formattedDate.replace(/(\d{2})(?=\D)/, "$1");
};
