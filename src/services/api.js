import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

let root_url = import.meta.env.VITE_BASE_URL || ''

const instance = axios.create({
    baseURL: root_url,
    headers: {
        'content-type': 'application/json'
    },
    timeout: 30000,
    timeoutErrorMessage: 'Timeout'
})

// ==== Hàm kiểm tra token có hợp lệ không ====
const isValidJwt = (token) => {
    return token && token.split('.').length === 3
}

// ==== Hàm gọi refresh token ====
const getRefresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!isValidJwt(refreshToken)) return null

    try {
        const res = await axios.post(`${root_url}/api/v1/auth/refresh`, null, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const newAccessToken = res?.data?.data?.access_token
        if (isValidJwt(newAccessToken)) {
            localStorage.setItem('access_token', newAccessToken)
            return newAccessToken
        }
        return null
    } catch (err) {
        return null
    }
}

// ==== Gán access_token vào mọi request nếu có ====
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (isValidJwt(token)) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => Promise.reject(error)
)

// ==== Tự động refresh khi access_token hết hạn ====
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response?.status === 401 && error.response?.data?.code === 401 && error.response.data?.message?.id === 'SESSION_TOKEN_EXPIRED') {
            originalRequest._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token
                            resolve(instance(originalRequest))
                        },
                        reject: (err) => reject(err)
                    })
                })
            }

            isRefreshing = true

            try {
                const newToken = await getRefresh()
                if (!newToken) {
                    toast("Phiên đăng nhập đã hết hạn", {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                        type: 'error',
                    });

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('userProfile');


                    setTimeout(() => {
                        window.location.href = '/login';  // hoặc dùng router nếu có sẵn
                        // router.push({ name: 'Login' });
                    }, 5000);
                    return Promise.reject(error)
                }

                instance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken
                processQueue(null, newToken)
                return instance(originalRequest)
            } catch (err) {
                processQueue(err, null)
                toast("Phiên đăng nhập đã hết hạn", {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                    type: 'error',
                });
            
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('userProfile');
            
                setTimeout(() => {
                    window.location.href = '/login';  // hoặc dùng router nếu có sẵn
                    // router.push({ name: 'Login' });
                }, 5000);
                // window.location.href = '/login'
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        } else if (error.response?.status === 401) {
            toast("Bạn chưa đăng nhập", {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'error',
            });
        }

        return Promise.reject(error)
    }
)

export default instance
