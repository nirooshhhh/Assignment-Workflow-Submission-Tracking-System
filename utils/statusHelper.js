const getAssignmentStatus = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);

    return now > due ? "closed" : "active";
};

 module.exports = { getAssignmentStatus };