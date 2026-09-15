// Persian number and price formatting utilities

export function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

export function formatPrice(priceTomans: number): string {
  if (!priceTomans || priceTomans <= 0) {
    return 'تماس بگیرید';
  }
  return toPersianDigits(priceTomans.toLocaleString('en-US')) + ' تومان';
}

export function formatPriceKilo(priceTomans: number): string {
  if (!priceTomans || priceTomans <= 0) {
    return '';
  }
  const inThousands = Math.round(priceTomans / 1000);
  return `(${toPersianDigits(inThousands)} هزار تومان)`;
}
