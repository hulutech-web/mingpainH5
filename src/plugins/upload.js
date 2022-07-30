import axios from 'axios';
import 'weui'
import weui from 'weui.js'
axios.interceptors.response.use(
    //成功拦截
    function (response) {
        console.log(response)
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
const _baseURL = '/api'

let http = {};
let ContentType = "application/json";
let uploadFileType = "multipart/form-data";
http.baseURL = _baseURL;

/**
 * 上传文件的请求
 * @param url
 * @returns {AxiosPromise}
 */
http.uploadFile = function (url, data) {
    let config = {
        //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
        url: url,
        //基础url前缀
        baseURL: _baseURL,
        transformResponse: [function (data1) {
            var data = data1;
            if (typeof data1 == "string") {
                data = JSON.parse(data1);
            }
            return data;
        }],
        //请求头信息
        headers: { 'access-user': window.localStorage.getItem('access-user'), 'Content-Type': uploadFileType },

        //跨域请求时是否需要使用凭证
        withCredentials: true,
        // 返回数据类型
        responseType: 'json', //default
    };
    return axios.post(url, data, config);
};

export default http