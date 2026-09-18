export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
  }).format(new Date(dateString));
}