import {serviceTask} from '@/utils/request';

export function getTasksByUser(userId, page, limit, filters) {

    let url = `tasks/get/${userId}?page=${page}`

    if(limit){
        url += `&limit=${limit}&`
    }

    for (let name in filters) {
        if (name === 'title' && filters[name].length) {
            url += `&${name}=${filters[name]}`
        }else if (filters[name].length === 0) {
            url += ``
        } else {
            url += `&${name}=${filters[name]}`
        }
    }

    return serviceTask({
        url,
        method: 'get',
    })
}

export function createTask(data) {
    return serviceTask({
        url: `/tasks/create`,
        method: 'post',
        data: data
    })
}

export function editTask(data) {
    return serviceTask({
        url: `/tasks/update/${data._id}`,
        method: 'put',
        data: data
    })
}

export function deleteTask(id) {
    return serviceTask({
        url: `/tasks/delete/${id}`,
        method: 'delete'
    })
}
