<template>
  <page class="page_content-padding">
    <div class="bindphone-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#4399e9">
          <span slot="title">{{bindStatus === 'bind' ? $t('userCenter.bindPhone.unBindPhone') : $t('userCenter.bindPhone.bindPhone')}}</span>
          <div class="bind-main">
            <div class="main-title">
              {{bindStatus === 'bind' ? $t('userCenter.bindPhone.unBindPhone') : $t('userCenter.bindPhone.bindPhone')}}
              <span v-if="!bind" class="user-num">{{userNum}}</span>
            </div>

            <div class="form-box">
              <Form ref="bindForm" :model="bindForm" label-position="top" :rules="rules">
                <FormItem :label="$t('userCenter.bindPhone.nationality')" prop="nationality" class="ivu-form-item-required">
                  <Select :label-in-value="true" v-model="bindForm.nationality" style="width:100%;height: 50px;">
                    <Option v-for="(item, index) in phoneCodes" :value="item.area_code" :key="index">{{item['name_'+activeLang] + ' + ' + item.area_code }}</Option>
                  </Select>
                </FormItem>

                <FormItem :label="$t('userCenter.bindPhone.mbileNumber')" prop="phone" class="ivu-form-item-required">
                  <Input v-model="bindForm.phone"></Input>
                </FormItem>

                <FormItem :label="$t('userCenter.bindPhone.smsCode')" prop="phoneCode" class="phone-form-item ivu-form-item-required">
                  <Input style="width: 360px" v-model="bindForm.phoneCode" class="fl"></Input>
                  <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                  <div v-show="!codeDown" class="send-code-btn fr" @click="handleSendCode">
                    <Spin v-show="sendCodeLoading" size="small" fix></Spin>
                    <span>{{ $t('userCenter.bindPhone.getCode') }}</span>
                  </div>
                </FormItem>

                <!-- <FormItem :label="$t('userCenter.bindPhone.ga')" prop="googleCode">
                  <Input v-model="bindForm.googleCode"></Input>
                </FormItem> -->

                <FormItem>
                  <Button class="pr" type="primary" @click="handleConfirmClick('bindForm')" long>
                    {{ $t('userCenter.bindPhone.confirm') }}
                    <Spin v-show="btnLoading" :fix="true"></Spin>
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from '../components/page'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'
import util from '../../libs/util.js'
import phoneCodes from '../../static/i18n/code.json'

ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})
export default {
  name: 'bindphone',
  data() {
    return {
      phoneCodes: phoneCodes,
      pageHeight: 0,
      haveNationality: false,
      isPhone: false,
      btnLoading: false,
      sendCodeLoading: false,
      codeDown: false,
      codeDownText: '',
      timer: null,
      token: '',
      bind: false,
      userNum: '',
      bindStatus: '',
      type: '',
      nationalityList: [],
      oldLang: '',
      bindForm: {
        nationality: '86',
        phone: '',
        phoneCode: '',
        googleCode: ''
      },
      rules: {
        nationality: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                this.haveNationality = true
                callback()
              } else {
                this.haveNationality = false
                callback(this.$t('errorMsg.NATIONALITY_UNSELECT'))
              }
            },
            trigger: 'change'
          }
        ],
        phone: [
          {
            validator: (rule, value, callback) => {
              // 先判断是否选择国籍
              this.$refs.bindForm.validateField('nationality', () => {})
              if (!value) {
                callback(this.$t('errorMsg.PHONE_BLANK'))
              }
              if (util.checkPhone(this.bindForm.nationality, value)) {
                this.isPhone = true
                callback()
              } else {
                this.isPhone = false
                callback(this.$t('errorMsg.SYMBOL_ERR'))
              }
            },
            trigger: 'blur'
          }
        ],
        phoneCode: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.CODE_BLANK'))
              }
              if (util.checkCode(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.CODE_NOT_NUM'))
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
    activeLang() {
      return this.$store.state.activeLang
    }
  },
  methods: {
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 发送验证码
     */
    handleSendCode() {
      this.$refs.bindForm.validateField('phone', (valid) => {
        if (valid !== '' || this.sendCodeLoading) {
          return
        }

        var lang = this.activeLang === 'cn' ? 'zh-cn' : this.activeLang === 'en' ? 'en-us' : ''
        this.sendCodeLoading = true
        if (this.isPhone && this.haveNationality) {
          var vu = this
          ax({
            url: config.url.user + '/api/user/bindPhone',
            method: 'post',
            data: {
              phone: vu.bindForm.phone,
              country: vu.bindForm.nationality,
              pn: cookie.get('PN'),
              type: vu.type,
              language: lang
            },
            transformRequest: [
              function(data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    '=' +
                    encodeURIComponent(data[it]) +
                    '&'
                }
                return ret.slice(0, ret.length - 1)
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(res => {
              vu.sendCodeLoading = false
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.codeDown = true
                vu.token = res.data.result.token
                vu.handleCodeDown()
                vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
              } else {
                apiError(vu, res)
              }
            })
            .catch(err => {
              // vu.codeDown = true
              vu.sendCodeLoading = false
              apiReqError(vu, err)
            })
        } else {
          this.$refs.bindForm.validateField('phone', () => {})
          this.$refs.bindForm.validateField('nationality', () => {})
          this.sendCodeLoading = false
        }
      });
    },
    /**
     * 倒计时
     */
    handleCodeDown() {
      var time = 120
      this.codeDownText =
        time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        time -= 1
        if (time <= 0) {
          this.codeDown = false
          clearInterval(this.timer)
        }
        this.codeDownText =
          time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      }, 1000)
    },
    /**
     * 绑定 && 解绑
     */
    handleConfirmClick(form) {
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          this.btnLoading = true
          ax({
            url: config.url.user + '/api/user/verifyBindPhone',
            method: 'post',
            data: {
              phone: vu.bindForm.phone,
              country: vu.bindForm.nationality,
              code: vu.bindForm.phoneCode,
              pn: cookie.get('PN'),
              type: vu.type,
              token: vu.token
            },
            transformRequest: [
              function(data) {
                let ret = ''
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    '=' +
                    encodeURIComponent(data[it]) +
                    '&'
                }
                return ret.slice(0, ret.length - 1)
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(res => {
              if (res.status == '200' && res.data.errorCode == 0) {
                this.btnLoading = false
                vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
                vu.$refs.bindForm.resetFields()
                vu.$router.push('/usercenter')
              } else {
                this.btnLoading = false
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
    /**
     * 获取用户信息
     */
    getUserInfo() {
      var vu = this
      ax
        .post(config.url.user + '/api/user/getUserInfo')
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            sessionStorage.setItem('idCardStatus', res.data.result.idCardStatus)
            if (res.data.result.phone.number) {
              vu.bind = true
              sessionStorage.setItem('bindPhone', 'bind')
              vu.bindStatus = 'bind'
              vu.type = 'release'
              vu.userNum =
                '+ ' +
                res.data.result.phone.country +
                ' ' +
                res.data.result.phone.number
            } else {
              vu.bind = false
              vu.bindStatus = 'unbind'
              sessionStorage.setItem('bindPhone', 'unbind')
            }
            sessionStorage.setItem('email', res.data.result.email)
            etLog(res.data.result)
          } else {
            apiError(vu, res)
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    }
  },
  mounted() {
    this.oldLang = this.activeLang;
    var bindStatus = sessionStorage.getItem('bindPhone')
    var userNum = sessionStorage.getItem('userNum')
    if (bindStatus) {
      if (bindStatus === 'bind') {
        this.bindStatus = bindStatus
        this.type = 'release'
        this.userNum = userNum
      } else if (bindStatus === 'unbind') {
        this.bindStatus = bindStatus
      }
    } else {
      this.bindStatus = 'unbind' // '默认为unbind'
      this.getUserInfo()
    }
    var vu = this
    bus.$on('langChange', () => {
      if (vu.oldLang !== vu.activeLang) {
        vu.oldLang = vu.activeLang;
        vu.$refs.bindForm.resetFields()
        vu.bindForm.nationality = ''
        setTimeout(() => {
          vu.bindForm.nationality = '86';
        }, 50);
      }
    })
  },
  created() {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
    bus.$off('langChange');
    clearInterval(this.timer)
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
.bindphone-cont {
  box-sizing: border-box;
  .crd {
    .ivu-card {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
  .ivu-spin {
    display: inline-block;
  }
  .bind-main {
    padding: 54px 60px;
    .main-title {
      font-size: 24px;
      line-height: 24px;
      color: #5999e5;
      padding-bottom: 46px;
      border-bottom: 1px solid #ebebeb;
      .user-num {
        font-size: 16px;
      }
    }
  }
  .form-box {
    width: 520px;
    padding-top: 40px;
    .ivu-form-item {
      margin-bottom: 30px;
    }
    .send-code-btn {
      position: relative;
      // display: inline-block;
      box-sizing: border-box;
      min-width: 140px;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border: 1px solid #5999e5;
      border-radius: 0px;
      color: #5999e5;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #5999e5;
        color: #fff;
      }
    }
    .send-code-down {
      box-sizing: border-box;
      min-width: 140px;
      height: 40px;
      line-height: 38px;
      padding: 0 10px;
      border: 1px solid #999;
      color: #fff;
      background-color: #999;
      text-align: center;
    }
    .ivu-input {
      box-sizing: border-box;
      height: 40px;
      // padding: 10px 20px;
    }
    .ivu-btn {
      border-radius: 0px;
    }
    .ivu-btn-primary {
      height: 40px;
      font-size: 16px;
    }
    .phone-form-item {
      & .ivu-form-item-content {
        *zoom: 1;
        &::after {
          content: '';
          display: block;
          height: 0;
          clear: both;
        }
      }
    }
  }
}
</style>
