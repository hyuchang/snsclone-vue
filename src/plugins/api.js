import axios from "axios"

const http = async (url, param, method, header = {}) => {

    if (process.env.NODE_ENV == "development") {
        console.log("========[Start][" + method + "]", url, "=========")
        console.log("Parameter :: ", param)
        console.log("headers:", header)
    }
    let option = {
        url: `${process.env.VUE_APP_API_HOST}/${url}`,
        method: method,
        data: param,
        headers: header,
    }
    const result = await axios(option)
    if (process.env.NODE_ENV == "development") {
        console.log('url====>' + url)
        console.log(result.data.data)
    }
    return result
}

export default http
