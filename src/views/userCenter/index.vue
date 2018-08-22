<template>
  <page class="page_content-padding">
    <div class="user-center-cont">
      <div class="content-body-main clearfix">
        <crd potColor="#11b588">
          <span slot="title">{{ $t('userCenter.index.baseInfo.title') }}</span>
          <div class="card-box basic-info">
            <div class="basic-top">
              <span class="email">{{userEmail}}</span>
              <router-link v-if="idCardStatus === '0'" to="/usercenter/kyc" class="to-kyc">
                {{ $t('userCenter.index.baseInfo.kycUncheck') }} >
              </router-link>
              <span v-if="idCardStatus === '1'" class="to-kyc kyc-checked">
                {{ $t('userCenter.index.baseInfo.kycChecking') }}
              </span>
              <span v-if="idCardStatus === '2'" class="to-kyc kyc-checked">
                {{ $t('userCenter.index.baseInfo.kycChecked') }}
              </span>
              <router-link v-if="idCardStatus === '3'" to="/usercenter/kyc" class="to-kyc">
                {{ $t('userCenter.index.baseInfo.kycRefused') }} >
              </router-link>
            </div>
            <div class="basic-btm">
              <span class="recent-time">{{ $t('userCenter.index.baseInfo.recentLoginTime') }} : {{mtime ? mtime : userMtime}}（GMT+8）</span>
              <span>IP: {{userIP}}</span>
            </div>
          </div>
        </crd>

        <!-- 安全设置 -->
        <crd potColor="#449aec">
          <span slot="title">{{ $t('userCenter.index.safeSetting.title') }}</span>
          <div class="card-box safe-setting">
            <div class="card-item">
              <span class="card-item-title fl">{{ $t('userCenter.index.safeSetting.loginPassword') }}</span>
              <span @click="handleShowChangePwdModel" class="card-item-opera fr">{{ $t('userCenter.index.safeSetting.change') }} ></span>
            </div>
            <div class="card-item car-item-unline">
              <span class="card-item-title fl">{{ $t('userCenter.index.safeSetting.linkPhone') }}</span>
              <span class="card-item-text fl">{{ $t('userCenter.index.safeSetting.linkPhoneTip') }}</span>
              <router-link v-if="bind" to="/usercenter/bind" class="card-item-opera fr">{{ $t('userCenter.index.safeSetting.nowLink') }} :
                <span>{{userNum}}</span> {{ $t('userCenter.index.safeSetting.unlink') }} ></router-link>
              <router-link v-else to="/usercenter/bind" class="card-item-opera fr">{{ $t('userCenter.index.safeSetting.link') }} ></router-link>
            </div>

            <!-- <div class="card-item car-item-unline">
              <span class="card-item-title fl">谷歌验证</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <span @click="handleShowGAModel" class="card-item-opera fr">设置 ></span>
            </div> -->
          </div>

          <!-- 修改密码框 -->
          <Modal v-model="showChangePwd" class-name="change-pwd-model" :closable="false" :on-cancel="handleCloseChangePwd">
            <crd potColor="#4399e9">
              <span slot="title">{{ $t('userCenter.index.changePwd.title') }}</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="rules" :model="changePwdModal" label-position="top">
                  <FormItem :label="$t('userCenter.index.changePwd.curPwd')" prop="currentPwd" class="ivu-form-item-required">
                    <Input type="password" v-model="changePwdModal.currentPwd"></Input>
                  </FormItem>
                  <FormItem prop="password" class="ivu-form-item-required">
                    <span slot="label">{{ $t('userCenter.index.changePwd.newPwd') }}
                    </span>
                    <Input type="password" v-model="changePwdModal.password"></Input>
                  </FormItem>
                  <FormItem :label="$t('userCenter.index.changePwd.confirmPwd')" prop="confirmPwd" class="ivu-form-item-required">
                    <Input type="password" v-model="changePwdModal.confirmPwd"></Input>
                    <!-- <div class="pwd-rule">
                       密码要求：8 - 32个字符，至少一个大写字母，至少一个数字，至少一个特殊字符〜！@＃$％^＆*（）_ +
                    </div> -->
                  </FormItem>
                </Form>
              </div>
            </crd>

            <div slot="footer">
              <div class="model-btn-wrap clearfix">
                <span class="model-btn primary fl" @click="handleChangePwd('formCustom')">
                  <Spin v-if="changeLoading" fix size="small"></Spin>{{ $t('userCenter.index.changePwd.change') }}
                </span>
                <span class="model-btn fr" @click="handleCloseChangePwd('formCustom')">{{ $t('userCenter.index.changePwd.cancel') }}</span>
              </div>
            </div>
          </Modal>

          <!-- 谷歌验证框 -->
          <!-- <Modal v-model="showGAModel" class-name="change-pwd-model" :closable="false">
            <crd potColor="#4399e9">
              <span slot="title">身份验证</span>
              <div class="form-box">
                <div class="ga-step">
                  <div class="hd">
                    <span class="index">1</span>
                    <span class="txt">下载并安装 Googie 身份验证器</span>
                  </div>
                  <div class="cnt">
                    <img src="../../static/imgs/ga-google-play.png" alt="">
                    <img src="../../static/imgs/ga-app-store.png" alt="">
                  </div>
                </div>
                <div class="ga-step">
                  <div class="hd">
                    <span class="index">2</span>
                    <span class="txt">使用 Googie 身份验证器 扫描二维码或输入序列号</span>
                  </div>
                  <div class="cnt">
                    <div>
                      <img class="qrcode" src="http://www.bubi.cn/r/cms/www/default/images/qrcode_bubichain.jpg" alt="">
                      <p class="descript">此密钥可让您在手机丢失的情况下恢复您的 Googie 身份验证。如需重制Googe 身份验证，请提交工单支持，我们需要至少7天处理您的申请。</p>
                    </div>
                    <p class="address">GKDFGFDKGGFDKGDHGVHDFOBFDB</p>
                  </div>
                </div>
                <div class="ga-step">
                  <div class="hd">
                    <span class="index">3</span>
                    <span class="txt">谷歌验证码</span>
                  </div>
                  <div class="cnt">
                    <Form ref="gaFormCustom" :rules="rules" :model="changePwdModal" label-position="top">
                      <FormItem label="" prop="confirmPwd">
                        <Input v-model="changePwdModal.confirmPwd" placeholder="请输入谷歌验证码"></Input>
                      </FormItem>
                    </Form>
                  </div>
                </div>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn fl">
                  <Spin v-if="changeLoading" size="small"></Spin>身份验证</span>
              </div>
            </div>
          </Modal> -->
        </crd>
        <crd potColor="#fe7263">
          <span slot="title">{{ $t('userCenter.index.loginLog.title') }}</span>
          <div class="card-box recent-login">
            <Table :columns="recentUserCol" :data="recentUserInfo"></Table>
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
      mtime: '',
      bind: false,
      userNum: '',
      idCardStatus: '',
      recentUserCol: [
        {
          title: this.$t('userCenter.index.loginLog.device'),
          key: 'device'
        },
        {
          title: this.$t('userCenter.index.loginLog.ip'),
          key: 'ip'
        },
        {
          title: this.$t('userCenter.index.loginLog.event'),
          key: 'event',
          render: (h, params) => {
            if (params.row.event === 'Sign-in') {
              return h(
                'span',
                {
                  style: {
                    color: '#4298ec'
                  }
                },
                this.$t('userCenter.index.loginLog.success')
              )
            } else {
              return h(
                'span',
                {
                  style: {
                    color: '#fc4e59'
                  }
                },
                this.$t('userCenter.index.loginLog.fail')
              )
            }
          }
        }
      ],
      recentUserInfo: [],
      changePwdModal: {},
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
              if (value != this.changePwdModal.password) {
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
     * kyc 认证状态
     * 0 未验证
     * 1 审核中
     * 2 已通过
     * 3 被驳回
     */
    getUserInfo() {
      var vu = this
      ax
        .post(config.url.user + '/api/user/getUserInfo')
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            sessionStorage.setItem('idCardStatus', res.data.result.idCardStatus)
            vu.idCardStatus = res.data.result.idCardStatus + ''
            if (res.data.result.phone) {
              vu.bind = true
              sessionStorage.setItem('bindPhone', 'bind')
              vu.userNum =
                '+ ' +
                res.data.result.phone.country +
                ' ' +
                res.data.result.phone.number
            } else {
              vu.bind = false
              sessionStorage.setItem('bindPhone', 'unbind')
              sessionStorage.setItem('userNum', null)
            }
            sessionStorage.setItem('email', res.data.result.email)
            sessionStorage.setItem('userNum', vu.userNum)
          } else {
            apiError(vu, res);
          }
        })
        .catch(err => {
          apiReqError(vu, err);
        })
    },
    handleShowChangePwdModel() {
      this.showChangePwd = true
    },
    handleChangePwd(form) {
      this.changeLoading = true
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          ax
            .post(config.url.user + '/api/user/changePassword', {
              password: md5(vu.changePwdModal.currentPwd),
              new_password: md5(vu.changePwdModal.password)
            })
            .then(res => {
              console.log(res)
              if (res.status == '200' && res.data.errorCode == 0) {
                console.log(res.data)
                vu.changeLoading = false
                vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
                vu.showChangePwd = false
              } else {
                vu.changeLoading = false
                apiError(vu, res);
              }
            })
            .catch(err => {
              vu.changeLoading = false
              apiReqError(vu, err);
            })
        } else {
          console.log(4)
          vu.changeLoading = false
        }
      })
    },
    getRecentActivity() {
      var vu = this
      ax
        .get(config.url.user + '/api/user/getRecentActivity', getHeader)
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            vu.recentUserInfo = res.data.result.data
          } else {
            apiError(vu, res);
          }
        })
        .catch(err => {
          apiReqError(vu, err);
        })
    },
    handleCloseChangePwd(form) {
      this.changeLoading = false
      this.$refs[form].resetFields()
      this.showChangePwd = false
    },
    /**
     * 显示谷歌验证框
     */
    handleShowGAModel() {
      this.showGAModel = true
    }
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
    this.getUserInfo()
    this.getRecentActivity()
    var vu = this
    util.toggleTableHeaderLang(
      vu.recentUserCol,
      2,
      'userCenter.index.loginLog.',
      vu
    )
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(
        vu.recentUserCol,
        2,
        'userCenter.index.loginLog.',
        vu
      )
    })
  }
}
</script>

<style lang="less">
.user-center-cont {
  width: 100%;
  background-color: #f6f6f6;
  .card-box {
    padding: 0 60px;
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
  .basic-info {
    padding-top: 36px;
    padding-bottom: 30px;
    .basic-top {
      margin-bottom: 28px;
      .email {
        padding-right: 60px;
      }
      .to-kyc {
        color: #419cf6;
        cursor: pointer;
      }
      .kyc-checked {
        cursor: auto;
      }
    }
    .basic-btm {
      color: #9a9a9a;
      .recent-time {
        padding-right: 127px;
      }
    }
  }
  .recent-login {
    padding-top: 26px;
  }
  .ivu-table-wrapper {
    border: none;
    .ivu-table::after {
      width: 0;
    }
    .ivu-table::before {
      width: 0;
    }
    .ivu-table tr {
      height: 80px;
      color: #9a9a9a;
    }
    .ivu-table th {
      background-color: transparent;
      color: #495060;
    }
    .ivu-table tr:last-child td {
      border-bottom: none;
    }
    .ivu-table th:last-child {
      text-align: right;
    }
    .ivu-table td:last-child {
      text-align: right;
    }
  }
}
.change-pwd-model,
.login-model {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    width: 420px;
    min-height: 500px;
    top: 0;
    .ivu-modal-content {
      padding: 20px 40px 40px;
    }
    .ivu-modal-footer,
    .login-model-footer {
      border-top: none;
    }
    .ivu-card {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
    .form-box {
      padding-top: 40px;
    }
    .ivu-form-item {
      margin-bottom: 40px;
    }
    .pwd-rule {
      padding-top: 40px;
    }
  }
}
.ga-step {
  margin-bottom: 20px;
  .hd {
    .index {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 5px;
      background: rgba(89, 153, 229, 1);
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      color: #fff;
      border-radius: 50%;
    }
    .txt {
      font-size: 14px;
      color: #333;
    }
  }
  .cnt {
    padding-left: 40px;
    img {
      display: inline-block;
    }

    .qrcode {
      float: left;
      margin-right: 10px;
      width: 140px;
      height: 140px;
    }
    .descript {
      padding-top: 15px;
    }
    .address {
    }
  }
}
</style>
