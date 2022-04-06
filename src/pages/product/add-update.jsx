import React, { PureComponent } from 'react'
import { Row, Col, Select, Upload, Card, Icon, Form, Input, TreeSelect, Cascader, Button, message } from 'antd';
import RichEditor from './rich-editor'
// import PicturesWall from './pictures-wall'
// import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import './add-product.less'
import { reqCategorys,reqCategorys2, reqAddProduct, reqUpdateProduct } from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";

//const { Option } = Select;
const { TreeNode } = TreeSelect;
const { Item } = Form
const { TextArea } = Input
// const Option = Select.Option;
/*
Product的添加和更新的子路由组件
 */
class ProductAddUpdate extends PureComponent {


    constructor(props) {
        super(props);

        // 取出携带的state
        const product = memoryUtils.product  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        // this.isUpdate = !!product.id
        // //console.log(this.isUpdate)
        // 保存商品(如果没有, 保存是{})
        this.product = product || {}
        //console.log(product)
        this.state = {
            //    id: product.id,
            //  isUpdate: this.isUpdate,
            categoryList: [], //品类列表数据
            name: "", //商品名称
            // subtitle: '', //商品描述
            categoryId: '', //品类id
            tree:[],
            // subImages: [], //上传图片数组
            image: "",
            price: '', //商品价格
            stock: '', //库存
            detail: "", //商品详情
            status: 1 //商品状态 初始为1为在售
        }
    }

    loadCategoryList = () => {
        // let params = {
        //     categoryId: 0
        // }
        // reqCategorys(1, 100).then(res => {
        //     let { status, msg, data } = res;
        //     if (status !== 10000) {
        //         message(msg);
        //         return
        //     }

        //     let categoryList = Array.from(data.list);


        //     let topCategoryList = categoryList.filter((c) => (c.parentId === 0))
        //     //console.log(topCategoryList)
        //     let subCategoryList = categoryList.filter((c) => (c.parentId !== 0))
        //     //console.log(subCategoryList)
        //     this.setState({
        //         categoryList
            
        //     })
        // })

        reqCategorys2().then(res => {
            if (res.status === 10000) {
                this.setState({ tree: res.data });
              } else {
                message.error(res.msg);
              }
        })

        // http.get(api.categoryList2).then((res) => {
        //     if (res.status === 10000) {
        //       this.setState({ tree: res.data });
        //     } else {
        //       message.error(res.msg);
        //     }
        //   })
    }

    //分类选择
    selectChange = (val) => {
        this.setState({
            categoryId: val
        })
    }
    //改变商品名称
    onName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    //改变商品价格
    onPrice = (e) => {
        this.setState({
            price: 100 * e.target.value
        })
    }
    //改变商品库存件数
    onPieces = (e) => {
        this.setState({
            stock: e.target.value
        })
    }
    //上传图片
    uploadImg = (obj) => {
        let { file } = obj;
        if (file.status === 'done') {
            let { status, data } = file.response;
            if (status === 10000) {
                //let subImages = this.state.subImages.push(data.url);
                this.setState({
                    // subImages,
                    image: data
                })
            }
        }
    }
    //上传图片数据格式化
    getSubImagesString = () => {
        return this.state.subImages.map((image) => image.uri).join(',');
    }

    //获取上传图片后的图片资源位置
    getImageLocation = () => {
        return this.state.image;
    }

    //商品详情改变
    detailChange = (detail) => {
        this.setState({
            detail
        })
    }
    //提交
    onSubmit = () => {

        const product = memoryUtils.product  // 如果是添加没值, 否则有值
        let params = {
            name: this.state.name, //商品名称
            // subtitle    : this.state.subtitle, //商品描述
            categoryId: parseInt(this.state.categoryId, 10), //品类id
            // subImages   : this.getSubImagesString(), //上传图片数组
            image: this.state.image,
            detail: this.state.detail, //商品详情
            price: parseInt(this.state.price), //商品价格
            stock: parseInt(this.state.stock, 10), //商品库存
            status: this.state.status, //商品状态 初始为1为在售
        }

        //console.log(params)


        // 判断用户名为空
        if (typeof params.name !== 'string' || params.name.length === 0) {

            message.info('商品名称不能为空！');
            return;


        }
        // 判断描述不能为空
        // if(typeof params.subtitle !== 'string' || params.subtitle.length ===0){
        //     message.info('商品描述不能为空！');
        //     return;
        // }

        // 验证品类ID
        if (typeof params.categoryId !== 'number' || !(params.categoryId > 0)) {

            message.info('请选择商品品类！');
            return;


        }

        // 判断商品价格为数字，且大于0
        if (typeof params.price !== 'number' || !(params.price >= 0)) {

            message.info('请输入正确的商品价格');
            return;


        }

        // 判断库存为数字，且大于或等于0
        if (typeof params.stock !== 'number' || !(params.stock >= 0)) {

            message.info('请输入正确的商品库存');
            return {
                status: false,
            }


        }
        // 判断图片是否上传
        // if(typeof params.subImages !== 'string' || !params.subImages){
        //     return {
        //         status: false,
        //         msg: '请上传图片！'
        //     }
        // }
        //console.log("校验图片是否上传")
        if (!params.image) {

            message.info('请上传商品图片');
            return;


        }
        // //console.log("校验图片完成")
        // 判断商品详情不能为空
        if (!params.detail) {

            message.info('请添加商品详情');
            return;


        }
        // //console.log(params.detail)
        ////console.log("开始发送添加商品请求")
        // 如果是更新, 需要添加_id

        params = {
            name: this.state.name, //商品名称
            // subtitle    : this.state.subtitle, //商品描述
            categoryId: parseInt(this.state.categoryId, 10), //品类id
            // subImages   : this.getSubImagesString(), //上传图片数组
            image: this.state.image,
            detail: this.state.detail, //商品详情
            price: parseInt(this.state.price), //商品价格
            stock: parseInt(this.state.stock, 10), //商品库存
            status: this.state.status, //商品状态 初始为1为在售
        }
        reqAddProduct(params).then(res => {
            let { status, data } = res;
            //console.log(params)
            //console.log(res)
            if (status === 10000) {
                message.success(data);
                this.props.history.push('/product');
            }
        })
    }



    componentDidMount() {

        this.loadCategoryList()
    }

    render() {

        const product = memoryUtils.product  // 如果是添加没值, 否则有值
        const fileList = [];
        const uploadImg = {
            action: '/admin/upload/file', //图片上传地址
            //name: 'upload_file', //发到后台的文件参数名
            file: 'upload_file', //发到后台的文件参数名
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };

        const title = (
            <span>
              <LinkButton>
                <Icon
                  type='arrow-left'
                  style={{marginRight: 10, fontSize: 20}}
                  onClick={() => this.props.history.goBack()}
                />
              </LinkButton>
      
              <span>添加商品</span>
            </span>
          )

        return (
            <div className="add-product">
                <Card title={title} className='product-detail'>
                <Row>
                    <Col span={5}><p className='label'>商品名称</p></Col>
                    <Col span={10}><Input placeholder="请输入商品名称" onChange={this.onName} /></Col>
                </Row>
                {/* <Row>
                <Col span={5}><p className='label'>商品描述</p></Col>
                <Col span={10}><Input placeholder="请输入商品描述" onChange={this.onDescription} /></Col>
            </Row> */}
                <Row>
                    <Col span={5}><p className='label'>所属分类</p></Col>
                    <Col span={10}>
                        {/* <Select defaultValue="" className='select' onChange={this.selectChange} >
                            <Option value="">请选择一级分类</Option>
                            {
                                this.state.categoryList.length ? this.state.categoryList.map((category, index) => {
                                    return <Option value={category.id} key={index}>{category.name}</Option>
                                }) : null
                            }

                        </Select> */}
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={this.state.categoryId}
                            // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={(value) => { this.setState({ categoryId: value }) }}
                        >
                            {
                                this.state.tree.map((item) => {
                                    if (item.childCategory.length === 0) {
                                        return (
                                            <TreeNode value={item.id} title={item.name} key={item.id} />
                                        )
                                    } else {
                                        return (
                                            <TreeNode value={item.id} title={item.name} key={item.id}>
                                                {item.childCategory.map((item2) => {
                                                    //console.log("item2:", item2);
                                                    if (item2.childCategory.length === 0) {
                                                        return (
                                                            <TreeNode value={item2.id} title={item2.name} key={item2.id} />
                                                        )
                                                    } else {
                                                        return (
                                                            <TreeNode value={item2.id} title={item2.name} key={item2.id}>
                                                                {
                                                                    item2.childCategory.map((item3) => {
                                                                        return (
                                                                            <TreeNode value={item3.id} title={item3.name} key={item3.id} />
                                                                        )
                                                                    })
                                                                }
                                                            </TreeNode>

                                                        )
                                                    }
                                                })}
                                            </TreeNode>
                                        )
                                    }
                                })
                            }
                        </TreeSelect>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品价格</p></Col>
                    <Col span={10}>
                        <Input placeholder="价格" addonAfter="元" onChange={this.onPrice} />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品库存</p></Col>
                    <Col span={10}>
                        <Input placeholder="库存" addonAfter="件" onChange={this.onPieces} />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品图片</p></Col>
                    <Col span={10}>
                        <Upload {...uploadImg} onChange={this.uploadImg}>
                            <Button><Icon type="upload" /> 上传图片</Button>
                        </Upload>

                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品详情</p></Col>
                    <Col span={18}>
                        <RichEditor detailContent={this.state.detail} onChange={this.detailChange}></RichEditor>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5} span={10}>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </Col>
                </Row>
                </Card>
            </div>
        )
    }

}

// export default Form.create()(ProductAddUpdate)

export default ProductAddUpdate;