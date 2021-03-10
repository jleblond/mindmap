export const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}


export const postRequest= (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}



export const putRequest= (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: url,
            data: data,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}