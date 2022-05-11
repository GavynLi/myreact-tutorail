import React from 'react';
import PT from 'prop-types';
const emptyFunction=function(){}
/*当前IE上传组的id*/
let currentIEID=0;
/*存放当前IE上传组的可用情况*/
const IEFormGroup=[true]
/*当前xhr的数组(仅有一开始上传之后的xhr)*/
let xhrList=[];
let currentXHRID=0

class FileUpload extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chooseBtn:{},
            uploadBtn:{},
            before:[],
            middle:[],
            after:[]
        }
    }

    /*根据props更新组件*/
    _updateProps(props){

    }

    /*触发隐藏的input框选择*/
    /*触发beforeChoose*/
    commonChooseFile(){

    }
    /*现代浏览器的Input change事件 File API保存文件*/
    /*触发 chooseFile事件 */
    commonChange(e){

    }
    /*执行上传*/
    commonUpload(){

    }
    /*组装自定义添加到FormData的对象*/
    appendFieldsToFormData(formData){

    }
    /*IE选择前验证*/
    /*触发beforeChoose*/
    IEBeforeChoose(e){

    }

     /*IE需要用户真实点击上传按钮，所以使用透明按钮*/
    /*触发chooseFile*/
    IEChooseFile(e){

    }

     /*IE处理上传函数*/
    /*触发beforeUpload doUpload*/
    IEUpload(e){

    }

      /*IE回调函数*/
    //TODO 处理Timeout
    IECallback(dataType,frameId){

    }

    /*外部调用方法，主动触发选择文件(等同于调用btn.click()), 仅支持现代浏览器)*/


}

FileUpload.prototype={
    options:PT.shape({
        /*basics*/
        baseUrl:PT.string.isRequired,
        param:PT.oneOfType([PT.object,PT.func]),
        dataType:PT.string,
        chooseAndUpload:PT.bool,
        paramAddToField:PT.oneOfType([PT.object,PT.func]),
        wrapperDisplay:PT.string,
        timeout:PT.number,
        accept:PT.string,
        multiple:PT.bool,
        numberLimit:PT.oneOfType([PT.object,PT.func]),
        fileFieldName: PT.oneOfType([PT.string, PT.func]),
        withCredentials: PT.bool,
        requestHeaders: PT.object,
        /*specials*/
        tag: PT.string,
        userAgent: PT.string,
        disabledIEChoose: PT.oneOfType([PT.bool, PT.func]),
        _withoutFileUpload: PT.bool,
        filesToUpload: PT.arrayOf(PT.object),
        textBeforeFiles: PT.bool,
        /*funcs*/
        beforeChoose: PT.func,
        chooseFile: PT.func,
        beforeUpload: PT.func,
        doUpload: PT.func,
        uploading: PT.func,
        uploadSuccess: PT.func,
        uploadError: PT.func,
        uploadFail: PT.func,
        onabort: PT.func





    }).isRequired,
    style:PT.object,
    className:PT.string
};
export default FileUpload;