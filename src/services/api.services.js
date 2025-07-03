import http from './api';

const default_headers = { 'Content-Type': 'application/json' };

const base_api_path = '/api/v1'
class ApiService {
    getRequest = async (url, params, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        return await http.get(api_url, {
            params: params,
            headers: headers
        })
            .then(response => {
                if (response && response.status == 200) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response.data
                }
                console.log(error)
                return null
            });
    }
    getRequestHasToken = async (url, params, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;

        return await http.get(api_url, {
            params: params,
            headers: authHeaders
        })
            .then(response => {
                if (response && response.status == 200) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response.data
                }
                console.log(error)
                return null
            });
    }

    getRequestFileHasToken = async (url, params, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;
    
        return await http.get(api_url, {
            params: params,
            headers: authHeaders,
            responseType: 'blob'
        })
        .then(response => {
            return response
        })
        .catch(error => {
            if (error.response?.status < 500) {
                return error.response
            }
            console.log(error)
            return null
        });
    }

    getRequestFile = async (url, params, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        return await http.get(api_url, {
            params: params,
            headers: headers,
            responseType: 'blob',

        })
            .then(response => {
                if (response && response.status == 200) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response.data
                }
                console.log(error)
                return null
            });
    }

    postRequest = async (url, payload, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        return await http.post(api_url, payload, { headers: headers })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });
    }

    postRequestHasToken = async (url, payload, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;
        return await http.post(api_url, payload, { headers: authHeaders })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });
    }


    postImageFormRequest = async (url, imagefile, headers = { 'Content-Type': 'multipart/form-data' }) => {
        let api_url = `${base_api_path}${url}`
        var formData = new FormData();
        formData.append("image", imagefile);

        return await http.post(api_url, formData, { headers: headers })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })

    }

    postFilesFormRequest = async (url, files, headers = { 'Content-Type': 'multipart/form-data' }) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;
        var formData = new FormData();
        for (const file of files) {
            formData.append("files", file);
        }

        return await http.post(api_url, formData, { headers: authHeaders })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            }).catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });

    }

    postFileFormRequest = async (url, file, headers = { 'Content-Type': 'multipart/form-data' }) => {
        let api_url = `${base_api_path}${url}`
        var formData = new FormData();
        formData.append("file", file);
        return await http.post(api_url, formData, { headers: headers })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            }).catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });

    }

    postFormRequest = async (url, payload, headers = { 'Content-Type': 'multipart/form-data' }) => {
        let api_url = `${base_api_path}${url}`
        var formData = new FormData();
        for (const [key, value] of Object.entries(payload)) {
            formData.append(key, value);
        }

        return await http.post(api_url, formData, { headers: headers })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });
    }

    putRequest = async (url, payload, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        return await http.put(api_url, payload, { headers: headers })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });
    }

    putRequestHasToken = async (url, payload, headers = default_headers) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;
        return await http.put(api_url, payload, { headers: authHeaders })
            .then(response => {
                if (response && response.status >= 200 && response.status < 300) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response?.data
                }
                console.log(error)
                return null
            });
    }

    deleteRequest = async (url, payload, params, headers = { 'Content-Type': 'application/json' }) => {
        let api_url = `${base_api_path}${url}`
        const accessToken = localStorage.getItem('access_token');
        const authHeaders = accessToken
            ? { ...headers, 'Authorization': `Bearer ${accessToken}` }
            : headers;
        return await http.delete(api_url, {
            data: payload,
            params: params,
            headers: authHeaders
        })
            .then(response => {
                if (response && response.status == 200) {
                    return response.data
                }
            })
            .catch(error => {
                if (error.response?.status < 500) {
                    return error.response.data
                }
                console.log(error)
                return null
            });
    }



    logOut = async () => {
        let result = await this.deleteRequest('/auth/logout');

        localStorage.removeItem("userProfile");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");


        window.location.href = '/login';
    }

    postRegister = (body) => {
        return this.postRequest(`/auth/register`, body);
    }

    postVerityCode = (code, verity_code_id, type_input_code) => {

        const body = {
            'code': code,
            'verity_code_id': verity_code_id,
        }

        if(type_input_code){
            body.type_input_code = type_input_code
        }

        return this.postRequest(`/auth/verity_code`, body);
    }

    postLogin = (body) => {
        return this.postRequest(`/auth/login`, body);
    }

    getProfile = (params) => {
        return this.getRequestHasToken(`/profile`, params);
    }

    getUserTeleID = () => {
        return this.getRequestHasToken(`/profile/user_tele_id`);
    }

    uploadFile = (files) => {
        return this.postFilesFormRequest(`/file/upload`, files);
    }

    uploadOneFile = (file) => {
        return this.postFileFormRequest(`/file/upload_file`, file);
    }

    postProduct = (body) => {
        return this.postRequestHasToken('/manage/product', body);
    }

    putProduct = ( id, body) => {
        return this.putRequestHasToken(`/manage/product/${id}`, body);
    }

    getProduct = (params = {}) => {
        return this.getRequest('/product', params)
    }

    getProductSearchAi = (params = {}) => {
        return this.getRequestHasToken('/product/search_by_ai', params)
    }

    getItemsInCard = (page) => {
        const params = {}
        if (page) {
            params.page = page
        }
        return this.getRequestHasToken('/cart', params)
    }

    postItemInCard = (body) => {
        return this.postRequestHasToken('/cart', body)
    }

    putItemInCard = (cart_id, body) => {
        return this.putRequestHasToken(`/cart/${cart_id}`, body)
    }

    getProductDetail = (product_id) => {
        return this.getRequest(`/product/${product_id}`)
    }

    deleteProduct = (list_id) => {
        const payload = {
            'list_id': list_id
        }
        return this.deleteRequest('/manage/product', payload)
    }

    deleteItemInCart = (list_id) => {
        const payload = {
            'list_id': list_id
        }
        return this.deleteRequest('/cart', payload)
    }

    updateProfile = (body) => {
        return this.putRequestHasToken('/profile', body)
    }

    updateAvatar = (avatar_id) => {
        const payload = {}
        if (avatar_id) {
            payload.avatar_id = avatar_id
        }
        return this.putRequestHasToken(`/profile/update_avatar`, payload)
    }

    postSendCode = (body = {}) => {
        return this.postRequestHasToken('/auth/send_code', body)
    }

    postForgessPassword = (body) => {
        return this.postRequestHasToken('/auth/forgot_password', body)
    }

    putChangePassword = (body) => {
        return this.putRequestHasToken('/auth/change_password', body)
    }

    postSessionOrder = (body) => {
        return this.postRequestHasToken('/session_order', body)
    }

    getSessionOrder = (session_id, address_order_id) => {
        const params = {}

        if (address_order_id) {
            params.address_order_id = address_order_id
        }
        return this.getRequestHasToken(`/session_order/${session_id}`, params)
    }


    postOrder = (session_id, body) => {
        return this.postRequestHasToken(`/session_order/${session_id}`, body)
    }

    getOrder = (params = {}) => {
        return this.getRequestHasToken('/order', params)
    }
    getAdminOrderUser = (user_id, params = {}) => {
        return this.getRequestHasToken(`/manage/order/user/${user_id}`, params)
    }

    getOrderAdmin = (params = {}) => {
        return this.getRequestHasToken('/manage/order', params)
    }

    getOrderDetail = (order_id) => {
        return this.getRequestHasToken(`/order/${order_id}`)
    }

    updateOrderStatus = (order_id, status) => {
        const payload = {}
        if (status) {
            payload.status = status
        }
        return this.putRequestHasToken(`/manage/order/${order_id}`, payload)
    }

    completeOrder = (order_id) => {
        return this.putRequestHasToken(`/order/${order_id}`)
    }


    getTypeProduct = (params) => {
        return this.getRequestHasToken('/type_product', params)
    }

    getPaginatorTypeProduct = (params) => {
        return this.getRequestHasToken('/manage/type_product', params)
    }

    postAddTypeProduct = (body) =>{
        return this.postRequestHasToken('/manage/type_product', body)
    }

    putTypeProduct = (id, body) =>{
        return this.putRequestHasToken(`/manage/type_product/${id}`, body)
    }

    getTypeFilter = () => {
        return this.getRequest('/type_product')
    }

    postPaymentOnline = (session_id, body) => {
        return this.postRequestHasToken(`/payment_online/${session_id}`, body)
    }

    getPayment  = (payment_online_id) => {
        return this.getRequestHasToken(`/payment_online/${payment_online_id}`)
    }


    getStatisticAll = () => {
        return this.getRequestHasToken('/manage/statistic')
    }

    getStatisticNumberProductByType = () => {
        
        return this.getRequestHasToken('/manage/statistic/number_product_by_type')
    }

    getstatisticRevenueAndSoldByTypeProduct = (month) => {
        const params = {}

        if(month){
            params.month = month
        }
        return this.getRequestHasToken('/manage/statistic/revenue_and_sold_product_by_type', params)
    }

    getTopCustomer = () => {
        return this.getRequestHasToken('/manage/statistic/top_customer')
    }

    getProcessOrders = () => {
        return this.getRequestHasToken('/manage/statistic/process_orders')
    }
    getStatisticUsers = () => {
        return this.getRequestHasToken('/manage/statistic/number_user_by_age_and_gender')
    }

    getTopProduct = () => {
        return this.getRequestHasToken('/manage/statistic/top_product')
    }

    getStatisticAttendance = (time_str) => {
        const params = {}
        if (time_str){
            params.time_str = time_str
        }
        return this.getRequestHasToken('/manage/statistic/attendance', params)
    }

    getUserArticles = (params) => {
        return this.getRequestHasToken('/profile/article', params)
    }


    getCustomer = (params) => {
        return this.getRequestHasToken('/manage/user/customer', params)
    }
    
    activeUser = (user_id) => {
        return this.putRequestHasToken(`/manage/user/active/${user_id}`)
    }

    getCourse = (params) => {
        return this.getRequestHasToken('/course', params)
    }

    getSessionCourse = (product_id, params) => {
        return this.getRequestHasToken(`/manage/session_course/${product_id}`, params)
    }

    postSessionCourse = (product_id, body) => {
        return this.postRequestHasToken(`/manage/session_course/${product_id}`, { sessions: body})
    }

    deleteSessionCourse = (product_id, list_id) => {
        const payload = {
            'list_id': list_id
        }
        return this.deleteRequest(`/manage/session_course/${product_id}`, payload)
    }

    deleteHomeWork = (product_id, list_id) => {
        const payload = {
            'list_id': list_id
        }
        return this.deleteRequest(`/manage/home_work/${product_id}`, payload)
    }


    getCourseDetail = (product_id) => {
        return this.getRequestHasToken(`/course/${product_id}`)
    }

    getHomeWork = (product_id, params) => {
        return this.getRequestHasToken(`/manage/home_work/${product_id}`, params)
    }

    postHomeWork = (product_id, body) => {
        return this.postRequestHasToken(`/manage/home_work/${product_id}`, body)
    }

    getHomeWorkDetail = (product_id, home_work_id) => {
        return this.getRequestHasToken(`/manage/home_work/${product_id}/${home_work_id}`)

    }

    postQuestion = (home_work_id, body) =>{
        return this.postRequestHasToken(`/manage/question/${home_work_id}`, body)

    }
    deleteQuestion = (id) => {
        return this.deleteRequest(`/manage/question/${id}`)
    }

    getProductHomeWork = (product_id) => {
        return this.getRequestHasToken(`/home_work/${product_id}`)
    }

    getUserDoHomeWork = (home_work_id, params) => {
        return this.getRequestHasToken(`/home_work/${home_work_id}/session`, params)
    }

    getUserHomeWorkDetail = (home_work_id, params) => {
        return this.getRequestHasToken(`/home_work/${home_work_id}/data`, params)
    }

    getUserSessionHomeWork = (session_id) => {
        return this.getRequestHasToken(`/home_work/session/${session_id}`)
    }
    
    startHomeWork = (home_work_id) => {
        return this.postRequestHasToken(`/home_work/${home_work_id}`)
    }

    submitHomeWork = (home_work_id, body) => {
        return this.postRequestHasToken(`/home_work/session/${home_work_id}`, body)
    }

    getUserDetail = (user_id) => {
        return this.getRequestHasToken(`/manage/user/${user_id}`)
    }

    putSessionCourse = (session_id, body) => {
        return this.putRequestHasToken(`/manage/session_course/${session_id}`, body)
    }

    uploadDocument = (product_id, file) => {
        return this.postFileFormRequest(`/file/upload_doc/${product_id}`, file);
    }

    deleteFileDocument = (file_id) => {
        return this.deleteRequest(`/file/doc/${file_id}`)
    }

    downloadFile = (file_id) => {
        return this.getRequestFile(`/file/download/${file_id}`)
    }

    removeTypeProduct = (item_id) => {
        return this.deleteRequest(`/manage/type_product/${item_id}`)
    }

    uploadfileMp4 = (file) => {
        return this.postFileFormRequest(`/file/mp4`, file);
    }

}   

export default new ApiService()
