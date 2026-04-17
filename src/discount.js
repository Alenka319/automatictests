function calculateDiscount(price, percent) {
    if (percent < 0 || percent > 100) {
      throw new Error('Invalid percent');
    }
    return price * (1 - percent / 100);
}

export default calculateDiscount
