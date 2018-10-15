<template>
  <page class="page_content-padding">
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <Form class="form-box" ref="formField" :model="formField" :rules="rules" label-position="top">
              <FormItem class="form-item ivu-form-item-required" :label="$t('userCenter.kyc.nationality')" prop="nationality">
                <Select :label-in-value="true" v-model="formField.nationality" style="width:100%;height: 50px;" @on-change="changeNationality">
                  <Option v-for="(item, index) in nationalityList" :value="index" :key="index">{{ item }}</Option>
                </Select>
              </FormItem>

              <FormItem class="form-item fl ivu-form-item-required" :label="$t('userCenter.kyc.firstName')" prop="firstName">
                <Input v-model="formField.firstName" :placeholder="$t('userCenter.kyc.firstName')"></Input>
              </FormItem>

              <FormItem class="form-item fl family-name ivu-form-item-required" :label="$t('userCenter.kyc.familyName')" prop="familyName">
                <Input v-model="formField.familyName" :placeholder="$t('userCenter.kyc.familyName')"></Input>
              </FormItem>

              <FormItem class="form-item ivu-form-item-required" :label="formField.nationality === 'CN' ? $t('userCenter.kyc.idcardNo') : $t('userCenter.kyc.passportNo')" prop="idcardNo">
                <Input v-model="formField.idcardNo" :placeholder="formField.nationality === 'CN' ? $t('userCenter.kyc.idcardNo') : $t('userCenter.kyc.passportNo')"></Input>
              </FormItem>

              <FormItem class="ivu-form-item-required" :class="{'form-item form-item-front': true, 'passport': formField.nationality !== 'CN'}" :label="formField.nationality === 'CN' ? $t('userCenter.kyc.front') : $t('userCenter.kyc.passportFront')" prop="frontImg" v-if="showUp">
                <Upload :before-upload="handleUpload" :on-success="handleFrontSuccess" :on-format-error="handleFormatErr" :on-error="handleFrontUploadErr" :action="uploadPost" :data="{type: 'pid', idCardSide: 'front'}" :format="['jpg','jpeg','png']" :headers="kycHeaders" accept="image" :show-upload-list="false">
                  <div style="padding: 20px 0;">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-idcard-upload.png" alt="upload" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-upload.png" alt="upload" v-if="formField.nationality !== 'CN'">
                    <p class="tip" v-if="!files.front">{{$t('userCenter.kyc.pleaseUpload')}}{{formField.nationality === 'CN' ? $t('userCenter.kyc.front') : $t('userCenter.kyc.passportFront')}}</p>
                    <p class="after-tip" v-if="files.front">{{$t('userCenter.kyc.btnText')}}</p>
                    <img class="uploaded-img" v-if="files.front" :src="formField.frontImg" alt="">
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-id-front.png" alt="kyc-id-front" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-front.png" alt="kyc-passport-front" v-if="formField.nationality !== 'CN'">
                  </div>
                  <p class="sample-txt">{{$t('userCenter.kyc.notice')}}<br /><span style="font-family: SimSun; color: #ed3f14;">*</span><span style="color: #ed3f14;">{{$t('errorMsg.IMAGE_TOO_LARGE')}}</span></p>
                </div>
              </FormItem>

              <FormItem class="ivu-form-item-required" :class="{'form-item form-item-back': true, 'passport': formField.nationality !== 'CN'}" :label="formField.nationality === 'CN' ? $t('userCenter.kyc.back') : $t('userCenter.kyc.passportBack')" prop="backImg" v-if="showUp">
                <Upload :before-upload="handleUpload" :on-success="handleBackSuccess" :on-format-error="handleFormatErr" :on-error="handleBackUploadErr" :action="uploadPost" :data="{type: 'pid', idCardSide: 'back'}" :format="['jpg','jpeg','png']" :headers="kycHeaders" accept="image" :show-upload-list="false">
                  <div style="padding: 20px 0">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-idcard-upload.png" alt="upload" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-upload.png" alt="upload" v-if="formField.nationality !== 'CN'">
                    <p class="tip" v-if="!files.back">{{$t('userCenter.kyc.pleaseUpload')}}{{formField.nationality === 'CN' ? $t('userCenter.kyc.back') : $t('userCenter.kyc.passportBack')}}</p>
                    <p class="after-tip" v-if="files.back">{{$t('userCenter.kyc.btnText')}}</p>
                    <img class="uploaded-img" v-if="files.back" :src="formField.backImg" alt="">
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-id-back.png" alt="kyc-id-back" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-back.png" alt="kyc-passport-back" v-if="formField.nationality !== 'CN'">
                  </div>
                  <p class="sample-txt">{{$t('userCenter.kyc.notice')}}<br /><span style="font-family: SimSun; color: #ed3f14;">*</span><span style="color: #ed3f14;">{{$t('errorMsg.IMAGE_TOO_LARGE')}}</span></p>
                </div>
              </FormItem>

              <FormItem class="ivu-form-item-required" :class="{'form-item form-item-hold': true, 'passport': formField.nationality !== 'CN'}" :label="formField.nationality === 'CN' ? $t('userCenter.kyc.hold') : $t('userCenter.kyc.passportHold')" prop="holdImg" v-if="showUp">
                <Upload :on-progress="progressUpload" ref="upload" :before-upload="handleUpload" :on-success="handleHoldSuccess" :on-format-error="handleFormatErr" :on-error="handleHoldUploadErr" :action="uploadPost" :data="{type: 'pid', idCardSide: 'hold'}" :format="['jpg','jpeg','png']" :headers="kycHeaders" accept="image" :show-upload-list="false">
                  <div style="padding: 20px 0">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-idcard-upload.png" alt="upload" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-upload.png" alt="upload" v-if="formField.nationality !== 'CN'">
                    <p class="tip" v-if="!files.hold">{{$t('userCenter.kyc.pleaseUpload')}}{{formField.nationality === 'CN' ? $t('userCenter.kyc.hold') : $t('userCenter.kyc.passportHold')}}</p>
                    <p class="after-tip" v-if="files.hold">{{$t('userCenter.kyc.btnText')}}</p>
                    <img class="uploaded-img" v-if="files.hold" :src="formField.holdImg" alt="">
                  </div>
                </Upload>

                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-id-hold.png" alt="kyc-id-hold" v-if="formField.nationality === 'CN'">
                    <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/kyc-passport-hold.png" alt="kyc-passport-hold" v-if="formField.nationality !== 'CN'">
                  </div>
                  <p class="sample-txt sample-txt3">
                    {{$t('userCenter.kyc.standard.title')}}<br />
                    {{$t('userCenter.kyc.standard.text1')}}<br />
                    {{$t('userCenter.kyc.standard.text2')}}<br />
                    {{$t('userCenter.kyc.standard.text3')}}<br />
                    {{$t('userCenter.kyc.standard.text4')}}<br />
                    {{$t('userCenter.kyc.standard.text5')}}<br />
                    <span style="font-family: SimSun; color: #ed3f14;">*</span><span style="color: #ed3f14;">{{$t('errorMsg.IMAGE_TOO_LARGE')}}</span>
                  </p>
                </div>
              </FormItem>

              <Button class="submit btn-large" type="primary" @click="handleSubmit('formField')">
                {{$t('userCenter.kyc.submit')}}<Spin v-show="btnLoading" :fix="true"></Spin>
              </Button>
            </Form>
          </div>
        </crd>
      </div>
    </div>

    <Modal
        v-model="modelShow"
        :title="formField.nationality === 'CN' ? $t('userCenter.kyc.hold') + '的问题' : 'Error tip of ' + $t('userCenter.kyc.passportHold')"
        @on-ok="modelOk"
        @on-cancel="modelCancel">
        <p>{{$t(`baiduApiError.${modelErrorCode}`)}}</p>
    </Modal>
  </page>
</template>

<script>
import page from '../components/page'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'
import Axios from 'axios'
import {
    baiduApiError
} from '../../libs/utils/apiError.js'

export default {
  name: 'kyc',
  data() {
    return {
      pageHeight: 0,
      uploadPost: '',
      curLanguage: '',
      nationalityCNName: [],
      nationalityENName: [],
      nationalityList: [],
      oldNationlity: '',
      btnLoading: false,
      modelShow: false,
      modelErrorCode: '',
      formField: {
        nationality: 'CN',
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
        nationality: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.NATIONALITY_BLANK'))
              } else if (value.length > 100) {
                callback(this.$t('errorMsg.NATIONALITY_LIMIT_LENGTH'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        firstName: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.FIRSTNAME_BLANK'))
              }
              if (value.length > 100) {
                callback(this.$t('errorMsg.EMAIL_LIMIT_LENGTH'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        familyName: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.FAMILYNAME_BLANK'))
              }
              if (value.length > 100) {
                callback(this.$t('errorMsg.EMAIL_LIMIT_LENGTH'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        idcardNo: [
          {
            validator: (rule, value, callback) => {
              var reg = /^[A-Za-z0-9]+$/
              if (!value) {
                if (this.formField.nationality === 'CN') {
                  callback(this.$t('errorMsg.IDCARD_BLANK'))
                } else {
                  callback(this.$t('errorMsg.PASSPORT_BLANK'))
                }
              }
              if (!reg.test(value)) {
                callback(this.$t('errorMsg.IDCARD_ERROR'))
              } else if (value.length > 255) {
                callback(this.$t('errorMsg.IPT_LENGTH_LIMIT_255'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    crd,
    page
  },
  computed: {
    kycHeaders() {
      etLog(cookie.get('PN', { domain: config.url.domain }))
      return {
        'X-EXCHAIN-PN': cookie.get('PN', { domain: config.url.domain })
      }
    },
    getActiveLang() {
      return this.$store.state.activeLang
    },
    showUp() {
      return (
        this.formField.nationality &&
        this.formField.firstName &&
        this.formField.familyName &&
        this.formField.idcardNo
      )
    }
  },
  watch: {
    getActiveLang(val) {
      let that = this
      this.curLanguage = val
      this.nationalityList =
        val === 'cn' ? this.nationalityCNName : this.nationalityENName
      this.formField.nationality = ''
      this.$refs.formField.resetFields()
      setTimeout(() => {
        that.formField.nationality = ''
      }, 50)
    }
  },
  methods: {
    changeNationality(e) {
      // e 有值才执行
      if (
        e &&
        this.oldNationlity !== '' &&
        this.oldNationlity !== e.value &&
        (this.oldNationlity === 'CN' || e.value === 'CN')
      ) {
        this.files.front = ''
        this.files.back = ''
        this.files.hold = ''

        this.oldNationlity = this.formField.nationality

        this.$refs.formField.resetFields()
        this.formField.nationality = this.oldNationlity
      }
    },

    getNationalityByCN() {
      var vu = this
      ax.post(config.url.user + '/api/user/getCountryList', {
        code: 'zh_CN'
      })
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.nationalityCNName = res.data.result
            if (this.$store.state.activeLang === 'cn') {
              this.nationalityList = this.nationalityCNName
            }
          } else {
            apiError(vu, res)
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    },

    getNationalityByEN() {
      var vu = this
      ax.post(config.url.user + '/api/user/getCountryList', {
        code: 'en_US'
      })
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.nationalityENName = res.data.result
            if (this.$store.state.activeLang === 'en') {
              this.nationalityList = this.nationalityENName
            }
          } else {
            apiError(vu, res)
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    },
    progressUpload(event, file, fileList) {},
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 提交
     */
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.files.front) {
            if (this.formField.nationality === 'CN') {
              this.$Message.error(this.$t('errorMsg.FRONT_BLANK'))
            } else {
              this.$Message.error(this.$t('errorMsg.PASSPORT_FRONT_BLANK'))
            }
            return
          } else if (!this.files.back) {
            if (this.formField.nationality === 'CN') {
              this.$Message.error(this.$t('errorMsg.BACK_BLANK'))
            } else {
              this.$Message.error(this.$t('errorMsg.PASSPORT_BACK_BLANK'))
            }
            return
          } else if (!this.files.hold) {
            if (this.formField.nationality === 'CN') {
              this.$Message.error(this.$t('errorMsg.HOLD_BLANK'))
            } else {
              this.$Message.error(this.$t('errorMsg.PASSPORT_HOLD_BLANK'))
            }
            return
          } else if (this.modelErrorCode !== '') {
            this.modelShow = true;
            return;
          }
          var vu = this

          this.btnLoading = true

          ax.post(
            config.url.user + '/api/user/userKycRequest',
            {
              type: 'pid',
              countryCode: vu.formField.nationality,
              name: vu.formField.familyName + vu.formField.firstName,
              idCardNumber: vu.formField.idcardNo,
              idCardFrontUrl: vu.files.front,
              idCardBackUrl: vu.files.back,
              idCardHoldUrl: vu.files.hold
            },
            getHeader
          )
            .then(res => {
              this.btnLoading = false
              if (res.status === 200 && res.data.errorCode === 0) {
                vu.$router.push('/usercenter')
                vu.$Message.success(vu.$t('errorMsg.KYC_SUBMIT'))
              } else {
                apiError(vu, res)
              }
            })
            .catch(err => {
              this.btnLoading = false
              apiReqError(vu, err)
            })
        }
      })
    },

    handleUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 2

      if (!isLt2M) {
        this.$Message.error(this.$t('errorMsg.IMAGE_TOO_LARGE'))
        return false
      }
    },

    /**
     * 证件正面上传成功处理
     */
    handleFrontSuccess(res, file, fileList) {
      // var result = res.result.split('/')
      // var result_ = result[result.length - 1]
      this.files.front = res.result.ext
      this.formField.frontImg = res.result.front
      // this.$set(this.formField, 'frontImg', res.result)
    },
    /**
     * 正面上传文件失败，指服务器拒绝之类的问题
     */
    handleFrontUploadErr() {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 证件反面上传成功处理
     */
    handleBackSuccess(res, file, fileList) {
      // var result = res.result.split('/')
      // var result_ = result[result.length - 1]
      this.files.back = res.result.ext
      this.formField.backImg = res.result.back
      // this.$set(this.formField, 'backImg', res.result)
    },
    /**
     * 反面上传失败
     */
    handleBackUploadErr() {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 手持证件照片上传成功处理
     */
    handleHoldSuccess(res, file, fileList) {
      this.files.hold = res.result.ext
      this.formField.holdImg = res.result.hold
      ax.post(config.url.user + '/api/user/userIdentity', {
          name: this.formField.familyName + this.formField.firstName,
          idCardNumber: this.formField.idcardNo,
          type: 'pid'
        },
        getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode === 206) {
            this.modelErrorCode = '';
            apiError(this, res);
          } else if (res.status == '200' && res.data.errorCode === 223) {
            this.modelErrorCode = res.data.result.errorCode;
            this.modelShow = true;
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    },
    modelOk() {
      this.modelShow = false;
    },
    modelCancel() {
      this.modelShow = false;
    },
    /**
     * 手持上传失败
     */
    handleHoldUploadErr() {
      this.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
    },
    /**
     * 错误的文件后缀
     */
    handleFormatErr() {
      this.$Message.error(this.$t('errorMsg.FORMAT_ERROR'))
    }
  },
  created() {
    this.curLanguage = this.$store.state.activeLang
    this.getNationalityByCN()
    this.getNationalityByEN()
    if (sessionStorage.idCardStatus == '1' || sessionStorage.idCardStatus == '2') {
      // this.$router.push('/usercenter')
    }
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
    this.uploadPost = config.url.user + '/api/user/userUploadIdentity'
  },
  mounted() {
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.formField.resetFields()
    })
  },
  destroyed() {
    bus.$off('langChange')
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
.kyc-cont {
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
      background: rgba(245, 248, 253, 1);
      border-radius: 0px;
      text-align: center;
      cursor: pointer;
      img {
        display: inline-block;
      }
    }

    .uploaded-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 280px;
      height: 180px;
      border-radius: 0px;
    }
    .ivu-upload .tip {
      font-size: 16px;
    }
    .ivu-upload .after-tip {
      position: relative;
      z-index: 1;
      font-size: 16px;
      font-weight: 600;
      color: rgba(89, 153, 229, 1);
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
        background: rgba(245, 248, 253, 1);
        border-radius: 0px;
        img {
          display: inline;
        }
      }
      .sample-txt {
        float: left;
        margin-top: 65px;
        margin-left: 40px;
        font-size: 14px;
        color: rgba(19, 20, 24, 1);
      }
      .sample-txt3 {
        width: 430px;
        margin-top: -5px;
        line-height: 28px;
      }
    }
    .passport .sample .sample-img-wrap {
      background: #faf0f0;
    }
    .submit {
      width: 280px;
    }
    .passport {
      .ivu-upload-select {
        background: #faf0f0;
      }
      .after-tip {
        color: #faf0f0;
      }
    }
    .form-item-front {
      .sample .sample-img-wrap img {
        margin-top: 1px;
      }
      &.passport .sample .sample-img-wrap img {
        margin-top: 19px;
      }
    }
    .form-item-back {
      .sample .sample-img-wrap img {
        margin-top: 14px;
      }
      &.passport .sample .sample-img-wrap img {
        margin-top: 19px;
      }
    }
    .form-item-hold {
      .sample .sample-img-wrap img {
        margin-top: 7px;
      }
      &.passport .sample .sample-img-wrap img {
        margin-top: 7px;
      }
    }
  }
}
</style>
