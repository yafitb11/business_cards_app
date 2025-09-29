const normalizeUpdatedCard = async (updatedCard) => {
    const normalizedCard = { ...updatedCard };

    if (updatedCard.image) {
        normalizedCard.image = {
            url:
                updatedUser.image.url ||
                "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
            alt: updatedUser.image.alt || "normalizedUser image"
        };
    }

    if (updatedCard.address) {
        normalizedCard.address = {
            ...updatedCard.address,
            state: updatedCard.address.state || "not defined",

        };
    }

    return normalizedCard;
};

module.exports = normalizeUpdatedCard;