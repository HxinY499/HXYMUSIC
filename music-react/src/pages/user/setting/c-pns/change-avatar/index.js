import React, { memo, useState } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {ChangeAvatarWrapper} from './style'
import ImgCrop from 'antd-img-crop';
import {changeAva} from "@/services/user"

export default memo(function XYChangeAvatar(props) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    console.log("beforeUpload")
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isJpgOrPng) {
      message.error({content:'只允许 JPG/PNG 格式',className: "err-message"});
      return false
    }else if (!isLt20M) {
      message.error({content:'图片不能大于20MB',className: "err-message"});
      return false
    }else{
      return true
    }
  }
  const handleChange = info => {
    console.log(info.file.status)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {setImageUrl(imageUrl);setLoading(false)});
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function uploadAva(values) {
    const formData = new FormData()
    formData.append("avatar", values.file)
    formData.append("id", values.data.id)
    changeAva(formData).then(res=>{
      if(res.data.success === "true"){
        message.success({content:'上传成功',className: "suc-message"});
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        values.onSuccess()
      }else{
        message.error({content:'上传失败',className: "err-message"});
        values.onError()
      }
    })
  }
  return (
  <ChangeAvatarWrapper>
    <ImgCrop rotate
      modalTitle="编辑图片"
      grid={true}
      modalOk="保存"
      modalCancel="取消">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        data={{id: props.id}}
        onChange={handleChange}
        showUploadList={false}
        customRequest={uploadAva}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
    <span className="tip">支持jpg、png格式的图片，且文件小于20M</span>
  </ChangeAvatarWrapper>
  )
})