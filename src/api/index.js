/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

const BASE = ''
// 登陆

export const reqLogin = (userName, password) => ajax('/adminLogin', {userName, password},'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (pageNum,pageSize) => ajax(BASE + '/admin/category/list', {pageNum,pageSize})

//普通用户获取分类列表
export const reqCategorys2 = () => ajax(BASE + '/category/list')

// 添加分类
export const reqAddCategory = params => ajax(BASE + '/admin/category/add', params, 'POST','application/json;charset=UTF-8')

// 更新分类
export const reqUpdateCategory =  params => ajax(BASE + '/admin/category/update',  params, 'POST','application/json;charset=UTF-8')

//删除分类
export const reqDeleteCategory = (id) => ajax(BASE + '/admin/category/delete', {id}, 'POST')

//添加商品
export const reqAddProduct = params => ajax(BASE + '/admin/product/add',params, 'POST','application/json;charset=UTF-8')

//修改商品信息
export const reqUpdateProduct = params => ajax(BASE + '/admin/product/update',params, 'POST','application/json;charset=UTF-8')

//商品详情 前后台通用
export const reqProductDetail = params => ajax(BASE + '/product/detail',params,'GET');
// 删除指定商品
export const reqDeleteProduct = (id) => ajax(BASE + '/admin/product/delete', {id}, 'POST')




// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/admin/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (ids, sellStatus) => ajax(BASE + '/admin/product/batchUpdateSellStatus', {ids, sellStatus}, 'POST')



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, keyword, orderby,categoryId}) => ajax(BASE + '/product/list', {
  pageNum,
  pageSize,
  keyword, orderby,categoryId
})


//管理员获取订单列表
export const reqOrders = (pageNum, pageSize) => ajax(BASE + '/admin/order/list', {pageNum, pageSize})

//订单详情
export const reqOrderDetail = (orderNo) => ajax(BASE + '/order/detail',{orderNo})

export const reqSearchOrders = (pageNum, pageSize) => ajax(BASE + '/admin/order/list', {pageNum, pageSize})

//订单发货
export const reqOrderDelivery = (orderNo) => ajax(BASE + '/admin/order/delivered',{orderNo},'POST')

//订单完结
export const reqOrderEnd = (orderNo) => ajax(BASE + '/order/finish',{orderNo},'POST')