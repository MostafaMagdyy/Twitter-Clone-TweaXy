const parseDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
    });
    return formattedDate;
};

export default parseDate;
