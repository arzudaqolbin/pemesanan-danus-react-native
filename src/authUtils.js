import AsyncStorage from '@react-native-async-storage/async-storage';

// Fungsi untuk menyimpan token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Fungsi untuk menyimpan token
export const storeRole = async (role) => {
  try {
    await AsyncStorage.setItem('role', role);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Fungsi untuk menyimpan informasi pengguna yang sedang login
export const saveUserInfo = async (idRole) => {
  try {
    const idRoleStringified = JSON.stringify(idRole);
    await AsyncStorage.setItem('userInfo', idRoleStringified);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};


// Fungsi untuk mendapatkan token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan token
export const getRole = async () => {
  try {
    const role = await AsyncStorage.getItem('role');
    return role;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan informasi pengguna yang sedang login
export const getUserInfo = async () => {
  // try {
  //   const userInfoString = await AsyncStorage.getItem('userInfo');
  //   if (userInfoString !== null) {
  //     // Parse the string back to an object
  //     const userInfoObject = JSON.parse(userInfoString);
  //     return userInfoObject;
  //   }
  // } catch (error) {
  //   console.error('Error getting user info:', error);
  // }
  try {
    const id = await AsyncStorage.getItem('userInfo');
    return id;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};


// Fungsi untuk logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const isAuth = async () => {
    if((await getToken() !== null) && (await getRole() !== null)){
        return true
    }

    return false
}

export const apiAuth = async() => {
  const token = await getToken()
  return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
}

export const apiAuthForm = async() => {
  const token = await getToken()
  return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };
}