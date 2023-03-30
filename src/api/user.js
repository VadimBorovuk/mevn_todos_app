import {serviceUser} from "@/utils/request";


export function getAccess(data) {
    return serviceUser({
        url: `auth/access`,
        method: 'get',
        data: data
    })
}

export function signInUser(data) {
    return serviceUser({
        url: `auth/login`,
        method: 'post',
        data: data
    })
}

export function signUpUser(data) {
    return serviceUser({
        url: `auth/registration`,
        method: 'post',
        data: data
    })
}
