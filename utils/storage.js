import AsyncStorage from "@react-native-async-storage/async-storage";


const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@api_token', value)
    } catch (e) {
        // saving error
    }
}


const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@api_token')
        if (value !== null) {
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

export {getData, storeData}
