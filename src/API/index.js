import axios from "axios"

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = { error: "Internal Server Error" }
        return error
    }
}

export const API = async (url, option = {}) => {
    try {
        const newOption = {
            method: 'GET',

            ...option
        }
        const response = await axios(url, newOption)
        await checkStatus(response)
        return response
    } catch (error) {
        return error.response
    }
}