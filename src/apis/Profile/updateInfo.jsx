let UpdateInfoUrl = 'http://tweaxybackend.mywire.org/api/v1/users';
const updateInfo = async (
    _name,
    _birthdayDate,
    _bio,
    _avatar,
    _cover,
    _location,
    authToken
) => {
    const _nwbirthdayDate =
        _birthdayDate.month +
        '-' +
        _birthdayDate.day +
        '-' +
        _birthdayDate.year;
    console.log('auth token is', authToken);
    const formData = new FormData();
    if (_avatar) formData.append('avatar', _avatar);
    if (_cover) formData.append('cover', _cover);
    if (_birthdayDate.month && _birthdayDate.year && _birthdayDate.day)
        formData.append('birthdayDate', _nwbirthdayDate);
    if (_bio != 'null') formData.append('bio', _bio);
    if (_location != 'null') formData.append('location', _location);
    formData.append('name', _name);
    console.log('Data is ', formData.entries);
    try {
        const response = await fetch(UpdateInfoUrl, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData,
        });
        const data = await response.json();
        console.log('Response from the API:', data);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Avatar update api:', error.message);
        throw error;
    }
};

export default updateInfo;
