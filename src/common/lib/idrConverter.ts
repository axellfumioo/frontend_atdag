export function convertToIDR(amount: string) {
    const result = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(Number(amount));

    return result;
};