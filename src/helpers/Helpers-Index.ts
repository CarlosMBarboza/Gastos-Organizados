export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const dateObj = new Date(dateStr);
  
  // Asegúrate de que dateObj sea una fecha válida
  if (isNaN(dateObj.getTime())) {
    throw new Error("Fecha inválida");
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',  // 'long', 'short', 'narrow'
    month: 'long',    // 'numeric', '2-digit', 'long', 'short', 'narrow'
    year: 'numeric',   // 'numeric', '2-digit'
    day: 'numeric'     // 'numeric', '2-digit'
  };

  return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}
