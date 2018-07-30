<template>
  <page>
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <Form class="form-box" ref="formField" :model="formField" :rules="rules" label-position="top">
              <FormItem class="form-item fl" label="名" prop="firstName">
                <Input v-model="formField.firstName" placeholder="名"></Input>
              </FormItem>

              <FormItem class="form-item fl family-name" label="姓" prop="familyName">
                <Input v-model="formField.familyName" placeholder="姓"></Input>
              </FormItem>

              <FormItem class="form-item" label="身份证号码" prop="idcardNo">
                <Input v-model="formField.idcardNo" placeholder="身份证号码"></Input>
              </FormItem>

              <FormItem class="form-item" label="证件正面" prop="frontImg">
                <Upload
                  :on-success="handleFrontSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleFrontUploadErr"
                  action="/api/user/userUploadIdentity"
                  :data="{type: 'pid', idCardSide: 'front'}"
                  :with-credentials="true"
                  :format="['jpg','jpeg','png']"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0;">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                      <p class="after-tip" v-if="files.front">点击更改</p>
                      <img class="uploaded-img" v-if="files.front" :src="'//' + formField.frontImg" alt="证件正面">
                  </div>
                </Upload>
                
                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="../../static/imgs/kyc-idcard1.png" alt="证件正面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="证件背面" prop="backImg">
                <Upload
                  :on-success="handleBackSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleBackUploadErr"
                  action="/api/user/userUploadIdentity"
                  :data="{type: 'pid', idCardSide: 'back'}"
                  :with-credentials="true"
                  :format="['jpg','jpeg','png']"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                      <p class="after-tip" v-if="files.back">点击更改</p>
                      <img class="uploaded-img" v-if="files.back" :src="'//' + formField.backImg" alt="证件正面">                      
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:10px;">
                    <img src="../../static/imgs/kyc-idcard2.png" alt="证件背面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="手持证件照片" prop="holdImg">
                <Upload
                  :on-success="handleHoldSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleHoldUploadErr"
                  action="/api/user/userUploadIdentity"
                  :data="{type: 'pid', idCardSide: 'hold'}"
                  :with-credentials="true"
                  :format="['jpg','jpeg','png']"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                      <p class="after-tip" v-if="files.hold">点击更改</p>
                       <img class="uploaded-img" v-if="files.hold" :src="'//' + formField.holdImg" alt="证件正面">
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:5px;">
                    <img src="../../static/imgs/kyc-idcard3.png" alt="证件正面">
                  </div>
                  <p class="sample-txt sample-txt3">
                    手持证件照通过标准：</br>
                    人物头像清晰；</br>
                    身份证件信息清晰；</br>
                    证件照旁展示一张写有：EXCHAIN+申请日期的纸张信息；</br>
                    完整的展示您的手臂持证。
                  </p>
                </div>
              </FormItem>

              <Button class="submit" type="primary" @click="handleSubmit('formField')">申请提交</Button>
            </Form>
          </div>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from "../components/page"
import crd from "../components/crd.vue"
import ax from 'axios'
export default {
  name: 'kyc',
  data () {
    return {
      pageHeight: 0,
      formField: {
        firstName: '',
        familyName: '',
        idcardNo: '',
        frontImg: '',
        backImg: '',
        holdImg: ''
      },
      files: {
        front: '',
        back: '',
        hold: ''
      },
      rules: {
        firstName: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        familyName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        idcardNo: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ]
      },
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 提交
     */
    handleSubmit (form) {
      if (!this.files.front) {
        this.$Message.error('请上传身份证正面照')
        return
      } else if (!this.files.back) {
        this.$Message.error('请上传身份证背面照')
        return
      } else if (!this.files.hold) {
        this.$Message.error('请上传手持身份证照')
        return
      }
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          ax.post('/api/user/userKycRequest', {
            type: 'pid',
            name: this.formField.familyName + this.formField.firstName,
            idCardNumber: this.formField.idcardNo,
            idCardFrontUrl: this.files.front,
            idCardBackUrl: this.files.back,
            idCardHoldUrl: this.files.hold
          })
          .then((res) => {
            console.log(res)
            if (res.status === 200 && res.data.errorCode === 0) {
              this.$router.push('/usercenter')
              //修改kyc状态为待审核
              vu.$Message.success('kyc 认证提交成功')
            } else {
              vu.$Message.error('网络异常')
            }
          })
          .catch((err) => {
            vu.$Message.error('网络异常')
          })
        } else {
          vu.$Message.error('请检查您的的输入')
        }
      });
    },
    /**
     * 证件正面上传成功处理
     */
    handleFrontSuccess (res, file, fileList) {
      this.files.front = file.name
      this.formField.frontImg = res.result
      console.log('front ---- ' + this.files.front)
    },
    /**
     * 正面上传文件失败，指服务器拒绝之类的问题
     */
    handleFrontUploadErr () {
      this.$Message.success('网络异常')
    },
    /**
     * 证件反面上传成功处理
     */
    handleBackSuccess (res, file, fileList) {
      this.files.back = file.name
      this.formField.backImg = res.result
      console.log('back ---- ' + this.files.back)
    },
    /**
     * 反面上传失败
     */
    handleBackUploadErr () {
      this.$Message.success('网络异常')
    },
    /**
     * 手持证件照片上传成功处理
     */
    handleHoldSuccess (res, file, fileList) {
      this.files.hold = file.name
      this.formField.holdImg = res.result
      console.log('hold ---- ' + this.files.hold)
    },
    /**
     * 手持上传失败
     */
    handleHoldUploadErr () {
      this.$Message.success('网络异常')
    },
    /**
     * 错误的文件后缀
     */
    handleFormatErr () {
      this.$Message.success('错误的文件后缀')
    }
  },
  created () {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
  .kyc-cont {
    padding-top: 40px;
    font-size: 14px;
    .kyc-main {
      padding: 60px;
      .form-box {
        .form-item {
          width: 420px;
          &.fl {
            float: left;
          }
          &.family-name {
            margin-left: 50px;
          }
          .label {
            color: #000;
          }
          .ipt-box {
            .ipt {
              width: 100%;
            }
          }
        }
      }
      .ivu-upload-select {
        position: relative;
        width: 280px;
        height: 180px;
        padding-top: 25px;
        background: rgba(245,248,253,1);
        border-radius: 8px;
        text-align: center;
        img {
          display: inline-block;
        }
      }
      .uploaded-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 280px;
        height: 180px;
        border-radius: 8px;
      }
      .ivu-upload .tip {
        font-size: 16px;
        color: rgba(89,153,229,1);
      }
      .ivu-upload .after-tip {
        position: relative;
        z-index: 1;
        font-size: 16px;
        font-weight: 600;
        color: rgba(89,153,229,1);
        cursor: pointer;
      }
      .sample {
        position: absolute;
        top: 0px;
        left: 320px;
        width: 750px;
        .sample-img-wrap {
          float: left;
          width: 280px;
          height: 180px;
          text-align: center;
          background: rgba(245,248,253,1);
          border-radius: 8px;
        }
        .sample-txt {
          float: left;
          margin-top: 75px;
          margin-left: 40px;
          font-size:14px;
          color:rgba(19,20,24,1);
        }
        .sample-txt3 {
          margin-top: 10px;
        }
      }
      .submit {
        width: 280px;
      }
    }
  }


</style>
