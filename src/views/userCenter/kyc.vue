<template>
  <page>
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <Form class="form-box" ref="formField" :model="formField" :rules="rules" label-position="top">
              <FormItem class="form-item fl" :label="$t('userCenter.kyc.firstName')" prop="firstName">
                <Input v-model="formField.firstName" :placeholder="$t('userCenter.kyc.firstName')"></Input>
              </FormItem>

              <FormItem class="form-item fl family-name" :label="$t('userCenter.kyc.familyName')" prop="familyName">
                <Input v-model="formField.familyName" :placeholder="$t('userCenter.kyc.familyName')"></Input>
              </FormItem>

              <FormItem class="form-item" :label="$t('userCenter.kyc.idcardNo')" prop="idcardNo">
                <Input v-model="formField.idcardNo" :placeholder="$t('userCenter.kyc.idcardNo')"></Input>
              </FormItem>

              <FormItem class="form-item" :label="$t('userCenter.kyc.front')" prop="frontImg">
                <Upload
                  :on-success="handleFrontSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleFrontUploadErr"
                  :action="uploadPost"
                  :data="{type: 'pid', idCardSide: 'front'}"
                  :format="['jpg','jpeg','png']"
                  :headers="kycHeaders"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0;">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="">
                      <p class="tip" v-if="!files.front">{{$t('userCenter.kyc.tip')}}</p>
                      <p class="after-tip" v-if="files.front">{{$t('userCenter.kyc.btnText')}}</p>
                      <img class="uploaded-img" v-if="files.front" :src="'//' + formField.frontImg + '?t=' + Math.random()" alt="">
                  </div>
                </Upload>
                
                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="../../static/imgs/kyc-idcard1.png" alt="">
                  </div>
                  <p class="sample-txt">{{$t('userCenter.kyc.notice')}}</p>
                </div>
              </FormItem>

              <FormItem class="form-item" :label="$t('userCenter.kyc.back')" prop="backImg">
                <Upload
                  :on-success="handleBackSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleBackUploadErr"
                  :action="uploadPost"
                  :data="{type: 'pid', idCardSide: 'back'}"
                  :format="['jpg','jpeg','png']"
                  :headers="kycHeaders"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="">
                      <p class="tip" v-if="!files.back">{{$t('userCenter.kyc.tip')}}</p>
                      <p class="after-tip" v-if="files.back">{{$t('userCenter.kyc.btnText')}}</p>
                      <img class="uploaded-img" v-if="files.back" :src="'//' + formField.backImg + '?t=' + Math.random()" alt="">                      
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:10px;">
                    <img src="../../static/imgs/kyc-idcard2.png" alt="">
                  </div>
                  <p class="sample-txt">{{$t('userCenter.kyc.notice')}}</p>
                </div>
              </FormItem>

              <FormItem class="form-item" :label="$t('userCenter.kyc.hold')" prop="holdImg">
                <Upload
                  :on-success="handleHoldSuccess"
                  :on-format-error="handleFormatErr"
                  :on-error="handleHoldUploadErr"
                  :action="uploadPost"
                  :data="{type: 'pid', idCardSide: 'hold'}"
                  :format="['jpg','jpeg','png']"
                  :headers="kycHeaders"
                  accept="image"
                  :show-upload-list="false">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="">
                      <p class="tip" v-if="!files.hold">{{$t('userCenter.kyc.tip')}}</p>
                      <p class="after-tip" v-if="files.hold">{{$t('userCenter.kyc.btnText')}}</p>
                       <img class="uploaded-img" v-if="files.hold" :src="'//' + formField.holdImg" alt="">
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:5px;">
                    <img src="../../static/imgs/kyc-idcard3.png" alt="">
                  </div>
                  <p class="sample-txt sample-txt3">
                    {{$t('userCenter.kyc.standard.title')}}</br>
                    {{$t('userCenter.kyc.standard.text1')}}</br>
                    {{$t('userCenter.kyc.standard.text2')}}</br>
                    {{$t('userCenter.kyc.standard.text3')}}</br>
                    {{$t('userCenter.kyc.standard.text4')}}
                  </p>
                </div>
              </FormItem>

              <Button class="submit" type="primary" @click="handleSubmit('formField')">{{$t('userCenter.kyc.submit')}}</Button>
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
import config from '../../config/config.js'
import cookie from 'js-cookie'
export default {
  name: 'kyc',
  data () {
    return {
      pageHeight: 0,
      uploadPost:'',
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
          { required: true, message: this.$t('errorMsg.FIRSTNAME_BLANK'), trigger: 'blur' }
        ],
        familyName: [
          { required: true, message: this.$t('errorMsg.FAMILYNAME_BLANK'), trigger: 'blur' }
        ],
        idcardNo: [
          { required: true, message: this.$t('errorMsg.CARD_BLANK'), trigger: 'blur' }
        ]
      },
    }
  },
  components: {
    crd,
    page
  },
  computed: {
    kycHeaders () {
      console.log(cookie.get('PN', { domain: config.url.domain }))
      return {
        'X-EXCHAIN-PN': cookie.get('PN', { domain: config.url.domain })
      }
    }
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
        this.$Message.error(this.$t('errorMsg.FRONT_BLANK'))
        return
      } else if (!this.files.back) {
        this.$Message.error(this.$t('errorMsg.BACK_BLANK'))
        return
      } else if (!this.files.hold) {
        this.$Message.error(this.$t('errorMsg.HOLD_BLANK'))
        return
      }
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log('vu.files.front : ' + vu.files.front)
          // console.log('vu.files.back : ' + vu.files.back)
          // console.log('vu.files.hold : ' + vu.files.hold)
          ax.post(config.url.user+'/api/user/userKycRequest', {
            type: 'pid',
            name: vu.formField.familyName + vu.formField.firstName,
            idCardNumber: vu.formField.idcardNo,
            idCardFrontUrl: vu.files.front,
            idCardBackUrl: vu.files.back,
            idCardHoldUrl: vu.files.hold
          })
          .then((res) => {
            if (res.status === 200 && res.data.errorCode === 0) {
              vu.$router.push('/usercenter')
              vu.$Message.success(vu.$t('errorMsg.KYC_SUBMIT'))
            } else {
              vu.$Message.error(vu.$t('errorMsg.FAIL'))
            }
          })
          .catch((err) => {
            vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
          })
        }
      });
    },
    /**
     * 证件正面上传成功处理
     */
    handleFrontSuccess (res, file, fileList) {
      var result = res.result.split('/')
      var result_ = result[result.length - 1]
      this.files.front = result_
      // console.log(file)
      this.formField.frontImg = res.result + '?t=' + Math.random()
      // this.$set(this.formField, 'frontImg', res.result)
      // console.log(this.formField.frontImg)
    },
    /**
     * 正面上传文件失败，指服务器拒绝之类的问题
     */
    handleFrontUploadErr () {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 证件反面上传成功处理
     */
    handleBackSuccess (res, file, fileList) {
      var result = res.result.split('/')
      var result_ = result[result.length - 1]
      this.files.back = result_
      this.formField.backImg = res.result + '?t=' + Math.random()
      // this.$set(this.formField, 'backImg', res.result)
    },
    /**
     * 反面上传失败
     */
    handleBackUploadErr () {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 手持证件照片上传成功处理
     */
    handleHoldSuccess (res, file, fileList) {
      var result = res.result.split('/')
      var result_ = result[result.length - 1]
      this.files.hold = result_
      this.formField.holdImg = res.result + '?t=' + Math.random()
      // this.$set(this.formField, 'holdImg', res.result)
    },
    /**
     * 手持上传失败
     */
    handleHoldUploadErr () {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 错误的文件后缀
     */
    handleFormatErr () {
      this.$Message.error(this.$t('errorMsg.FORMAT_ERROR'))
    }
  },
  created () {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
    this.uploadPost = config.url.user + '/api/user/userUploadIdentity'
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
