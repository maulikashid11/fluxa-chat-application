export const removePassword = (user) => {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj
}

