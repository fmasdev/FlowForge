

export interface DateToLocaleFormat {
  date: string;
  time: string;
}

export const dateStringToDateAndTimeLocaleFormat = (dateString: string): DateToLocaleFormat => {
  const date = new Date(dateString)

  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
}