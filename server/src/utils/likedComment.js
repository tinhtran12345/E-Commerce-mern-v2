export const likeComment = (liked, state, curr) => {
    if (liked) {
        if (state) {
            return curr - 1;
        }
        return curr + 1;
    }
    return curr;
};
