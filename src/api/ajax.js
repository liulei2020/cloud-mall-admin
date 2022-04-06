
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET',
  contentType = 'application/x-www-form-urlencoded', //请求头内容类型 默认'application/json'
) {

  
  return new Promise((resolve, reject) => {
    let promise

    if("application/x-www-form-urlencoded" === contentType) {
      //FORM表单提交，需转换参数,否则将报400 Bad request错误
      let newParams  = new URLSearchParams();
      for(let key in data) {
          newParams.append(key,data[key])
      }
     data = newParams;
   }

    // 1. 执行异步ajax请求
    if(type==='GET') { // 发GET请求
      promise = axios.get(url, { // 配置对象
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    //  //console.log("post请求的参数为",data)
  
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }
    ).catch((error) => {
      message.error('请求出错了: ' + error.message)
    })
  })
}