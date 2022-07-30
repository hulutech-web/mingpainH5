import axios from 'axios'
import Vue from 'vue'
import 'weui'
import weui from 'weui.js'
axios.defaults.withCredentials = true
const _axios = axios.create({ baseURL: `/api`, timeout: 20000 })
window.axios = Vue.axios = Vue.prototype.axios = _axios
window.weui = weui
//请求拦截
_axios.interceptors.request.use(
    function (config) {
        //清除验证信息
        if (config.url[0] == '/') config.baseURL = ''
        const token = window.localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
//响应拦截
_axios.interceptors.response.use(
    //成功拦截
    function (response) {
        let { message } = response.data
        if (message) {
            weui.dialog({
                title: message
            })
        }
        return response.data
    },
    //错误拦截
    function (error) {
        // if (!error.response) return;
        let { status, data } = error.response
        switch (status) {
            case 422:
                weui.error({
                    title: data
                })
                break
            case 401:
                location.href = '/login'
                break
            case 429:
                weui.error({
                    title: data
                })
                break
            default:
                weui.error({
                    title: data
                })
        }
        return Promise.reject(error)
    }
)

export default _axios
