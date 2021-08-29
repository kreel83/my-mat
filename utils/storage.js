import AsyncStorage from "@react-native-async-storage/async-storage";


const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@api_token', value)
    } catch (e) {
        // saving error
    }
}

const deleteData = async () => {
    try {
        await AsyncStorage.removeItem('@api_token')
        return "deconnect";
    } catch (e) {
        // saving error
    }
}



const getData = async () => {

        const value = await AsyncStorage.getItem('@api_token')
        return value


}

export {getData, storeData, deleteData}
