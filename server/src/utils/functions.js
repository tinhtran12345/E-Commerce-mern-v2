export const getPrices = (stringNumber) => {
    return +stringNumber.match(/\d/g).join("");
};

export const getRandomNumber = () => {
    const max = 100;
    return Math.floor(Math.random() * max);
};

export const getTotalRating = (reviews) => {
    const ratingCount = reviews.length;
    const sumRatings = reviews.reduce((sum, el) => sum + +el.rating, 0);

    return Math.round((sumRatings * 10) / ratingCount) / 10;
};
