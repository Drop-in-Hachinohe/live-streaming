export const formatDate = (d: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }

  // 日本語で日付と時刻をフォーマット
  const formattedDate = d.toLocaleDateString('ja-JP', dateOptions)
  const formattedTime = d.toLocaleTimeString('ja-JP', timeOptions)

  return `${formattedDate} ${formattedTime} ~`;
}