export const greeting = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Selamat Pagi";
  if (hour >= 12 && hour < 15) return "Selamat Siang";
  if (hour >= 15 && hour < 18) return "Selamat Sore";

  return "Selamat Malam";
};
