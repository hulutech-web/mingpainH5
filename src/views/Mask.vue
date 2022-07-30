<template>
    <div>
        <div style="display:flex;border:1px solid #ccc;background-color: aliceblue;">
            <div class="container">
                <canvas width="375" height="200" id="c" style="border: 1px solid #ccc;"></canvas>
                <div style="flex-grow: 1;">
                    <div title="操作台">
                        <div style="padding:10px;">
                            <div style="text-align:left;">
                                <div class="weui-cells__title">取色器：</div>
                                <colorPicker v-model="color" style="margin-left:18px;" v-on:change="headleChangeColor">
                                </colorPicker>
                            </div>
                            <div>
                                <div class="weui-cells__title">标题：</div>
                                <button class="weui-btn weui-btn_primary" @click="addTitle">添加</button>
                            </div>
                            <div>
                                <div class="weui-cells__title">内容：</div>

                                <button class="weui-btn weui-btn_default" @click="addContent">添加</button>
                            </div>
                            <div>
                                <div class="weui-cells__title">LOGO：</div>
                                <button class="weui-btn_default weui-btn" @click="addLogo">添加</button>
                            </div>
                            <div>
                                <div class="weui-cells__title">重置：</div>
                                <button class="weui-btn_default weui-btn" @click="clearGraph" type="danger">清空</button>
                            </div>
                            <div>
                                <div class="weui-cells__title">操作：</div>
                                <button class="weui-btn_default weui-btn weui-btn_warn"
                                    style="background-color:#fa5151;color:white" @click="makePng">立即生成</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fabric } from 'fabric'

export default {
    data() {
        return {
            imageId: 1,
            canvas: {},
            iObjectsArr: [],
            currentObject: {},//当前选中对象
            color: '#ff1e02',
            form: {
                cover_img: null
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            //#region 
            // this.$weui.dialog({
            //     title: '提示',
            //     content: '是否领取礼品',
            //     buttons: [{
            //         label: '取消',
            //         type: 'default',
            //         onClick: () => {
            //             alert('您已取消领取礼品');
            //         }
            //     },
            //     {
            //         label: '确定',
            //         type: 'primary',
            //         onClick: () => {
            //             alert("您已确定")
            //         }
            //     }]
            // })
            //#endregion
            const canvas = new fabric.Canvas('c') // 这里传入的是canvas的id
            this.canvas = canvas

            this.canvas.on('mouse:down', function (event) {
                this.currentObject = event.target
            });
            this.canvas.on('selection:update', function (event) {
                console.log('selection:update', event)
            })
            let Shape;
            // (解决跨域图片加载)
            const image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = 'images/nameCards/1.png';
            image.onload = () => {
                Shape = new fabric.Image(image);
                this.canvas.setBackgroundImage(Shape, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / image.width,
                    scaleY: this.canvas.height / image.height,
                    left: 0,
                    top: 0,
                    originX: 'left',
                    originY: 'top',
                });
                this.canvas.renderAll(); //重新渲染画布
            }
        },
        addTitle() {
            const iTitle = new fabric.IText('标题', {
                name: "标题",
                left: 0, // 输入框离画布左侧距离
                top: 0, // 输入框离画布顶部距离
                padding: 7, // 设置输入框内边距
                fontSize: 24//设置大小
            })
            this.iObjectsArr.push(iTitle)
            this.canvas.add(iTitle) // 将输入框添加到画布中
        },
        addContent() {
            const iContent = new fabric.IText('文本', {
                name: "文本",
                left: 0, // 输入框离画布左侧距离
                top: 0, // 输入框离画布顶部距离
                padding: 7, // 设置输入框内边距
                fontSize: 14,//设置大小
                fill: '#00af57'
            })
            this.iObjectsArr.push(iContent)
            this.canvas.add(iContent) // 将输入框添加到画布中
        },
        handleModalChange(e) {
            this.canvas.clear();

            let Shape;
            // (解决跨域图片加载)
            const image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = `/images/nameCards/${e.target.value}.png`;
            image.style = 'width:375;height:187'
            image.onload = () => {
                Shape = new fabric.Image(image);
                this.canvas.setBackgroundImage(Shape, this.canvas.renderAll.bind(this.canvas), {
                    top: 0,
                    left: 0,
                    originX: 'left',
                    originY: 'top',
                });
                this.canvas.renderAll(); //重新渲染画布
            }
        },
        headleChangeColor(e) {
            console.log(e)
            var obj = this.canvas.getActiveObject()

            if (!obj) return
            //设置文本颜色
            if (obj.isEditing) {
                obj.setSelectionStyles({ fill: e })
            }
            this.canvas.renderAll();
        },
        addLogo() {
            let Logo;
            // (解决跨域图片加载)
            const image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = `/images/logo.png`;
            image.style = 'width:80;height:80'
            image.onload = () => {
                Logo = new fabric.Image(image);
                fabric.Image.fromURL(
                    '/images/logo.png',
                    (img) => {
                        this.canvas.add(img.set({
                            left: 0,
                            top: 0,
                            clipPath: new fabric.Circle({
                                radius: 200,
                                originX: 'center',
                                originY: 'center'
                            }),
                            angle: 0
                        }).scale(0.25)
                        );
                        this.canvas.renderAll()
                    }, { crossOrigin: 'anonymous' });
            }
        },
        delGraph() {
            this.canvas.remove(this.canvas.getActiveObject());
        },
        clearGraph() {
            //查看所有object
            this.canvas.clear();
            let Shape;
            // (解决跨域图片加载)
            const image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = 'images/nameCards/1.png';
            image.onload = () => {
                Shape = new fabric.Image(image);
                this.canvas.setBackgroundImage(Shape, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / image.width,
                    scaleY: this.canvas.height / image.height,
                    left: 0,
                    top: 0,
                    originX: 'left',
                    originY: 'top',
                });
                this.canvas.renderAll(); //重新渲染画布
            }
        },
        async makePng() {
            let base64Data = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
            let imageFile = this.dataURLtoFile(base64Data, 'aa.png')
            this.$http.uploadFile('/admin/upload64', { file: imageFile })
        },
        dataURLtoFile(dataurl, filename) {
            //将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

    }
}
</script>

<style scoped>
</style>