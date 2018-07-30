<template>
  <page>
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
                <FormItem :label="$t('userCenter.bindPhone.country')" prop="country">
                  <Select v-model="bindForm.country" style="width:100%;height: 50px;">
                    <Option v-for="(item, index) in countryList" :value="item.value" :key="index">{{ $t('userCenter.bindPhone.' + item.label) + ' + ' + item.value }}</Option>
                  </Select>
                </FormItem>

                <FormItem :label="$t('userCenter.bindPhone.mbileNumber')"  prop="phone">
                  <Input v-model="bindForm.phone" @on-change="handlePhoneIpt"></Input>
                </FormItem>

                <FormItem :label="$t('userCenter.bindPhone.smsCode')"  prop="phoneCode" class="phone-form-item">
                  <Input style="width: 360px" v-model="bindForm.phoneCode" class="fl"></Input>
                  <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                  <div v-show="!codeDown" class="send-code-btn fr" @click="handleSendCode"><Spin v-show="sendCodeLoading" size="small" fix></Spin><span>{{ $t('userCenter.bindPhone.getCode') }}</span></div>
                </FormItem>

                <FormItem :label="$t('userCenter.bindPhone.ga')"  prop="googleCode">
                  <Input v-model="bindForm.googleCode"></Input>
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="handleConfirmClick('bindForm')" long>{{ $t('userCenter.bindPhone.confirm') }}</Button>
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
import page from "../components/page"
import crd from "../components/crd.vue"
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'
ax.defaults.withCredentials = true;
export default {
  name: 'bindphone',
  data () {
    return {
      pageHeight: 0,
      isPhone: false,
      sendCodeLoading: false,
      confirmLoading: false,
      codeDown: false,
      timer: null,
      codeDownText: '120s后重新发送',
      token: '',
      bind: false,
      userNum: '',
      bindStatus: '',
      type: '',
      countryList: [],
      bindForm: {
        country: '86',
        phone: '',
        phoneCode: '',
        googleCode: ''
      },
      rules: {
        currentPwd: [
          { country: true, message: '请选择国家', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
               var reg = /^\d+$/
               if (reg.test(value)) {
                 this.isPhone = true
                 callback()
               } else {
                 this.isPhone = false
                 callback('手机号为数字')
               }
            }
          }
        ],
        phoneCode: [
          { required: true, message: '请输入手机号验证码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            var reg = /^\d+$/
            if (reg.test(value)) {
              callback()
            } else {
              callback('验证码为数字')
            }
          },
          trigger: 'blur' }
        ],
      }
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
    handlePhoneIpt () {
      // console.log(this.bindForm.phone)
    },
    handleSendCode () {
      if (this.sendCodeLoading) {
        return
      }
      this.sendCodeLoading = true
      if (this.isPhone) {
        var vu = this
        ax({
          url: config.url.user+'/api/user/bindPhone',
          method: 'post',
          data: {
            phone: vu.bindForm.phone,
            country: vu.bindForm.country,
            pn: cookie.get('PN'),
            type: vu.type,
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret.slice(0, (ret.length - 1))
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          vu.sendCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.codeDown = true
            vu.token = res.data.result.token
            vu.handleCodeDown()
          } else if (res.data.errorCode == 710) {
            vu.$Message.error('请先解绑现有手机号')
          } else {
            vu.codeDown = true
            vu.handleCodeDown()
          }
        })
        .catch((err) => {
          vu.codeDown = true
          vu.sendCodeLoading = false
        })
      } else {
        this.$refs.bindForm.validateField('phone', () => {
        })
        this.sendCodeLoading = false
      }
    },
    handleCodeDown () {
      var time = 120
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        time -= 1
        if (time <= 0) {
          this.codeDown = false
          clearInterval(this.timer)
        }
        this.codeDownText = time + 's后重新发送'
      }, 1000)
    },
    handleConfirmClick (form) {
      // this.confirmLoading = true
      this.$refs[form].validate((valid) => {
        console.log(2)
        if (valid) {
          console.log(3)
          ax({
            url: config.url.user+'/api/user/verifyBindPhone',
            method: 'post',
            data: {
              phone: this.bindForm.phone,
              country: this.bindForm.country,
              code: this.bindForm.phoneCode,
              pn: cookie.get('PN'),
              type: this.type,
              token: this.token
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret.slice(0, (ret.length - 1))
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then((res) => {
            if (res.status == '200' && res.data.errorCode == 0) {
              this.$Message.success('操作成功')
              this.$refs.bindForm.resetFields()
              this.$router.push('/usercenter')
            } else {
              this.$Message.error('网络异常')
            }
          })
          .catch((err) => {
            this.$Message.error('网络异常')
            console.log(err)
          })
        }
      })
    },
    getUserInfo () {
      var vu = this
      ax.post(config.url.user+'/api/user/getUserInfo')
        .then((res) => {
          if (res.status === 200 && res.data.errorCode === 0) {
            sessionStorage.setItem('idCardStatus', res.data.result.idCardStatus)
            if (res.data.result.phone.number) {
              vu.bind = true
              sessionStorage.setItem('bindPhone', 'bind')
              vu.bindStatus = 'bind'
              vu.type = 'release'
              vu.userNum = '+ ' + res.data.result.phone.code + ' '  + res.data.result.phone.number
            } else {
              vu.bind = false
              vu.bindStatus = 'unbind'
              sessionStorage.setItem('bindPhone', 'unbind')
            }
            sessionStorage.setItem('email', res.data.result.email)
            console.log(res.data.result)
          } else {
            console.log('网络异常！')
          }
        })
        .catch((err) => {
          console.log('网络异常！')
        })
    },
    getPhoneSupportList () {
      var vu = this
      ax.post(config.url.user+'/api/user/getPhoneSupportList')
        .then((res) => {
          if (res.status === 200 && res.data.errorCode === 0) {
            console.log(res.data.result)
            var result = res.data.result
            var obj = {}
            for (var key in result) {
              obj.label = key
              obj.value = result[key]
              this.countryList.push(obj)
            }
          }
        })
    }
  },
  mounted () {
    this.getPhoneSupportList()
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
  .bindphone-cont {
    padding-top: 40px;
    padding-bottom: 40px;
    box-sizing: border-box;
    .crd {
      margin-bottom: 0;
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
        color: #5999E5;
        padding-bottom: 46px;
        border-bottom: 1px solid #EBEBEB;
        .user-num {
          font-size: 16px;
        }
      }
    }
    .form-box {
      width: 520px;
      padding-top: 40px;
      .ivu-select-single .ivu-select-selection {
        height: 100%;
        padding-top: 10px;
        padding-left: 15px;
      }
      .ivu-form-item {
        margin-bottom: 30px;
      }
      .send-code-btn {
        position: relative;
        // display: inline-block;
        box-sizing: border-box;
        min-width: 140px;
        height: 50px;
        line-height: 48px;
        padding: 0 10px;
        border: 1px solid #5999E5;
        color: #5999E5;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
        &:hover {
          background-color: #5999E5;
          color: #fff;
        }
      }
      .send-code-down {
        box-sizing: border-box;
        min-width: 140px;
        height: 50px;
        line-height: 48px;
        padding: 0 10px;
        border: 1px solid #999;
        color: #fff;
        background-color: #999;
        text-align: center;
      }
      .ivu-input {
        box-sizing: border-box;
        height: 50px;
        padding: 10px 20px;
      }
      .ivu-btn-primary {
        height: 60px;
        font-size: 18px;
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
