<template>
  <page>
    <div class="bindphone-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#4399e9">
          <span slot="title">绑定手机号</span>
          <div class="bind-main">
            <div class="main-title">绑定手机号</div>
            <div class="form-box">
              <Form :model="bindForm" label-position="top" :rules="rules">
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
                  <Button type="primary" @click="handleSubmit('formCustom')" long>确认</Button>
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
export default {
  name: 'bindphone',
  data () {
    return {
      pageHeight: 0,
      isPhone: false,
      sendCodeLoading: false,
      countryList: [
        {
          label: '86',
          value: '中国 86'
        },
        {
           label: '86',
          value: '中国 86'
        },
        {
           label: '86',
          value: '中国 86'
        },
        {
           label: '86',
          value: '中国 86'
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
      var fd = new FormData()
      fd.phone = this.bindForm.phone
      fd.country = this.bindForm.country
        console.log(fd)
        // fd.append({
        //   phone: this.bindForm.phone,
        //   country: this.bindForm.country
        // })
      let headConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.isPhone) {
        ax.post(config.url.exchange + '/api/user/verifyBindPhone', fd, headConfig).then((res) => {
          this.sendCodeLoading = false
          console.log(res)
        }).catch((err) => {
          this.sendCodeLoading = false
        })
      }
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
