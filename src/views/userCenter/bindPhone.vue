<template>
  <page>
    <div class="bindphone-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#4399e9">
          <span slot="title">绑定手机号</span>
          <div class="bind-main">
            <div class="main-title">绑定手机号</div>
            <div class="form-box">
              <Form ref="bindForm" :model="bindForm" label-position="top" :rules="rules">
                <FormItem label="国家" prop="country">
                  <Select v-model="bindForm.country" style="width:100%;height: 50px;">
                    <Option v-for="(item, index) in countryList" :value="item.value" :key="index">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                  <Input v-model="bindForm.phone" @on-change="handlePhoneIpt"></Input>
                </FormItem>
                <FormItem label="短信验证码" prop="phoneCode">
                  <Input style="width: 360px" v-model="bindForm.phoneCode"></Input>
                  <span class="send-code-btn" @click="handleSendCode"><Spin v-show="sendCodeLoading" size="small"></Spin>发送验证码</span>
                </FormItem>
                <FormItem label="谷歌验证码" prop="googleCode">
                  <Input v-model="bindForm.googleCode"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleConfirmClick" long>确认</Button>
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
      countryList: [
        {
          label: '中国 86',
          value: '86'
        },
        {
           label: '中国 86',
           value: '86'
        },
        {
           label: '中国 86',
           value: '86'
        },
        {
           label: '中国 86',
           value: '86'
        }
      ],
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
          { min: 11, max: 11, message: '手机号为11位', trigger: 'blur' },
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
            //
          },
          trigger: 'blur' }
        ],
        googleCode: [
          { required: false, message: '请输入Google验证码', trigger: 'blur' }
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
      this.sendCodeLoading = true
      let headerConfig = {
          headers: {
              'Content-Type': 'x-www-form-urlencoded'
          }
      }
      if (this.isPhone) {
        ax({
          url: '/api/user/bindPhone',
          method: 'post',
          data: {
            phone: this.bindForm.phone,
            country: this.bindForm.country,
            pn: cookie.get('PN')
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
          this.sendCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            console.log('发送成功')
          }
        })
        .catch((err) => {
          this.sendCodeLoading = false
          console.log(err)
        })
      }
    },
    handleConfirmClick () {
      // this.confirmLoading = true
      console.log(1 + '-----')
      console.log(this.$refs.bindForm)
      // this.$refs.bindForm.validate((valid) => {
      //   console.log(2)
      //   if (valid) {
      //     console.log(3)
          ax({
            url: '/api/user/verifyBindPhone',
            method: 'post',
            data: {
              phone: this.bindForm.phone,
              country: this.bindForm.country,
              code: this.bindForm.phoneCode,
              pn: cookie.get('PN')
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
              console.log('绑定成功')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      //   }
      // })
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
        display: inline-block;
        box-sizing: border-box;
        min-width: 140px;
        height: 50px;
        line-height: 48px;
        padding: 0 10px;
        border-radius: 6px;
        margin-left: 16px;
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
      .ivu-input {
        box-sizing: border-box;
        height: 50px;
        padding: 10px 20px;
      }
      .ivu-btn-primary {
        height: 60px;
        font-size: 18px;
      }
    }
  }
</style>
