<template>
  <page class="page_content-padding">
    <div class="user-center-api">
      <div class="content-body-main clearfix">

        <crd potColor="#449aec">
          <span slot="title">{{ $t('userCenter.api.about.title') }}</span>
          <span slot="more" class="more">{{ $t('userCenter.api.about.doc') }}</span>
          <div class="card-box basic-info">{{ $t('userCenter.api.about.content') }}</div>
        </crd>

        <crd potColor="#449aec">
          <span slot="title">{{ $t('userCenter.api.applyStep.title') }}</span>
          <span slot="more" class="more pointer highlight" @click="applyFormShow = true">{{ $t('userCenter.api.applyStep.apply') }}</span>
          <ul class="card-box apply-step">
            <li v-for="(item, index) in [1, 2, 3, 4]" :key="index">
              <div><span>{{ $t(`userCenter.api.applyStep.step${item}`) }}</span></div>
              <img v-if="index != 3" src="../../../static/img/line2.png" alt="">
            </li>
          </ul>
        </crd>

        <crd potColor="#449aec">
          <span slot="title">{{ $t('userCenter.api.myApi.title') }}</span>
          <Table :columns="myKeyColumns" :data="myKeyData"></Table>
        </crd>

          <!-- 修改密码框 -->
          <Modal v-model="applyFormShow" class-name="change-pwd-model" :closable="false" :on-cancel="applyFormClose">
            <crd potColor="#4399e9">
              <span slot="title">{{ $t('userCenter.api.applyForm.title') }}</span>
              <div class="form-box">
                <Form ref="applyForm" :rules="rules" :model="applyForm" label-position="top">
                  <FormItem :label="$t('userCenter.api.applyForm.remark')" prop="remark" class="ivu-form-item-required">
                    <Input v-model="applyForm.remark"></Input>
                  </FormItem>
                  <FormItem :label="$t('userCenter.api.applyForm.passphrase')" prop="passphrase" class="ivu-form-item-required">
                    <Input v-model="applyForm.passphrase"></Input>
                  </FormItem>
                  <FormItem :label="$t('userCenter.api.applyForm.bindIp')" prop="bindIp" class="ivu-form-item-required">
                    <Input v-model="applyForm.bindIp"></Input>
                  </FormItem>
                  <FormItem :label="$t('userCenter.api.applyForm.access')" prop="access" class="ivu-form-item-required">
                    <CheckboxGroup v-model="applyForm.access">
                      <Checkbox label="read" :disabled="true">{{$t('userCenter.api.applyForm.readonly')}}</Checkbox>
                      <Checkbox label="withdraw">{{$t('userCenter.api.applyForm.withdraw')}}</Checkbox>
                      <Checkbox label="order">{{$t('userCenter.api.applyForm.trade')}}</Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem :label="$t('userCenter.api.applyForm.smsCode')" prop="smsCode" class="ivu-form-item-required">
                    <Input v-model="applyForm.smsCode" style="width: 250px"></Input>
                    <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                    <div v-show="!codeDown" class="send-code-btn fr" @click="getSmsCode">
                      <Spin v-show="sendCodeLoading" size="small" fix></Spin>
                      <span>{{$t('register.sendCode')}}</span>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </crd>

            <div slot="footer">
              <div class="model-btn-wrap clearfix">
                <Button class="model-btn primary fl pr" @click="applyFormSubmit">
                  {{ $t('common.confirm') }}
                  <Spin v-show="applyFormLoading" :fix="true"></Spin>
                </Button>

                <span class="model-btn fr" @click="applyFormClose">{{ $t('common.cancel') }}</span>
              </div>
            </div>
          </Modal>
      </div>
    </div>
  </page>
</template>

<script>
import page from '../components/page'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import md5 from 'crypto-md5'
import util from '../../libs/util.js'
import cookie from 'js-cookie'
ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})
export default {
  name: 'usercenter',
  components: {
    crd,
    page
  },
  computed: {
    myKeyColumns() {
      return [
        {
          title: this.$t('userCenter.api.myApi.remark'),
          key: 'remark'
        },
        {
          title: this.$t('userCenter.api.myApi.apiKey'),
          key: 'apiKey'
        },
        {
          title: this.$t('userCenter.api.myApi.access'),
          key: 'access'
        },
        {
          title: this.$t('userCenter.api.myApi.createTime'),
          key: 'createTime'
        },
        {
          title: this.$t('userCenter.api.myApi.opera'),
          key: 'opera',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: '#419cf6',
                    cursor: 'pointer',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      this.viewMykey()
                    }
                  }
                },
                this.$t('userCenter.api.myApi.view')
              ),
              h(
                'span',
                {
                  style: {
                    color: '#419cf6',
                    cursor: 'pointer',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      this.resetMykey()
                    }
                  }
                },
                this.$t('userCenter.api.myApi.reset')
              ),
              h(
                'span',
                {
                  style: {
                    color: '#419cf6',
                    cursor: 'pointer',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      this.deleteMykey()
                    }
                  }
                },
                this.$t('userCenter.api.myApi.delete')
              )
            ])
          }
        }
      ]
    },
    userEmail() {
      if (this.$store.state.email) {
        return this.$store.state.email
      } else if (sessionStorage.getItem('email')) {
        return sessionStorage.getItem('email')
      } else {
        return ' '
      }
    },
    userMtime() {
      if (this.$store.state.mtime) {
        return this.$store.state.mtime
      } else {
        return ' '
      }
    }
  },
  watch: {
    recentUserInfo() {
      if (this.recentUserInfo[0]) {
        this.mtime = this.recentUserInfo[0].time
        this.userIP = this.recentUserInfo[0].ip
      }
    },
    showChangePwd() {
      if (!this.showChangePwd) {
        this.$refs.formCustom.resetFields()
      }
    }
  },
  data() {
    return {
      codeDown: false,
      codeDownText: this.$t('register.sendCode'),
      applyFormShow: false,
      applyFormLoading: false,
      sendCodeLoading: false,
      mtime: '',
      bind: false,
      userNum: '',
      idCardStatus: '',
      kycRejectedReason: '',
      levelName: '',
      myKeyData: [],
      applyForm: {
        remark: '',
        passphrase: '',
        bindIp: '',
        access: ['read'],
        smsCode: '',
        token: ''
      },
      showChangePwd: false,
      changeLoading: false,
      userIP: '',
      rules: {
        currentPwd: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.CURRENT_PASSWORD_BLANK'))
              }
              if (util.checkPwd(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.PWD_LIMIT'))
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.NEW_PASSWORD_BLANK'))
              }
              if (util.checkPwd(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.PWD_LIMIT'))
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.CONFIRM_PASSWORD_BLANK'))
              }
              if (!util.checkPwd(value)) {
                callback(this.$t('errorMsg.PWD_LIMIT'))
              }
              if (value != this.applyForm.password) {
                callback(this.$t('errorMsg.DIFFERENT_PASSWORD_IPT'))
              } else {
                callback()
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      },
      // 是否显示谷歌验证框
      showGAModel: false
    }
  },
  methods: {
    /**
     * 获取用户等级
     */
    getApiList () {
      ax
        .post(config.url.user + '/api/userApi/getApiList')
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.myKeyData = res.data.result
          } else {
            apiError(this, res);
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },

    getSmsCode () {
      ax.post(
        config.url.user + '/api/userApi/getCode',
        {
          type: 'apply'
        },
        getHeader
      )
      .then(res => {
        if (res.status === 200 && res.data.errorCode === 0) {
          this.applyForm.token = res.data.result.token
          this.handleCodeDown()
        } else {
          apiError(this, res)
        }
      })
      .catch((err) => {
        apiReqError(this, err);
      })
    },
    
    applyFormSubmit () {
      ax.post(
        config.url.user + '/api/userApi/generateApi',
        {
          password: this.applyForm.passphrase,
          auth: this.applyForm.access,
          ip: this.applyForm.bindIp,
          note: this.applyForm.remark,
          token: this.applyForm.phone,
          code: this.applyForm.smsCode
        },
        getHeader
      )
      .then(res => {
        if (res.status === 200 && res.data.errorCode === 0) {
          this.$refs.applyForm.resetFields()
          this.applyFormShow = false
          this.getApiList();
        } else {
          apiError(this, res)
        }
      })
      .catch((err) => {
        apiReqError(this, err);
      })
    },
    applyFormClose () {
      this.$refs.applyForm.resetFields()
      // this.$refs.applyForm.access = ['read']
      this.applyFormShow = false
    },
    /**
     * 倒计时
     */
    handleCodeDown () {
      var time = 60
      this.codeDown = true
      this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        time -= 1
        if (time <= 0) {
           this.codeDown = false
          this.codeDownText = this.$t('register.sendCode')
          clearInterval(this.timer)
        }
         this.codeDown = true
        this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      }, 1000)
    },
  },
  mounted() {
    global.getHeader = (() => {
      return {
        headers: {
          'X-EXCHAIN-PN': cookie.get('PN', {
            domain: config.url.domain
          })
        }
      }
    })()
    ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
      domain: config.url.domain
    })
    this.getApiList()
    // this.getRecentActivity()
    // this.getUserLevel();
    // bus.$on('langChange', () => {
    // })
  },
  destroyed() {
    bus.$off('langChange');
  }
}
</script>

<style lang="less">
.user-center-api {
  width: 100%;
  background-color: #f6f6f6;
  .basic-info {
    padding: 20px;
  }
  .card-box {
    .card-item {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #e9eaec;
      .card-item-title {
        padding-right: 50px;
      }
      .card-item-text {
        color: #9a9a9a;
      }
      .card-item-opera {
        color: #419cf6;
        cursor: pointer;
      }
    }
    .car-item-unline {
      border-bottom: none;
    }
  }
  .card-box.apply-step {
    width: 945px;
    margin: 0 auto;
    padding: 20px 0px;
    li {
      width: 265px;
      display: inline-block;
      div {
        float: left;
        width: 150px;
        height: 50px;
        margin-right: 16px;
        text-align: center;
        span {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 5px 10px;
          align-items: center;
          justify-content: center;
          background: #449aec;
          color: #fff;
        }
      }
      img {
        width: 80px;
        margin-top: 20px;
      }
      &:last-child {
        width: 150px;
      }
    }
  }
}
</style>
