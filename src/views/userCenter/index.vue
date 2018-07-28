<template>
  <page>
    <div class="user-center-cont">
      <div class="content-body-main clearfix">
        <crd potColor="#11b588">
          <span slot="title">基本信息</span>
          <div class="card-box basic-info">
            <div class="basic-top">
              <span class="email">{{userEmail}}</span>
              <router-link v-if="idCardStatus === '0'" to="/usercenter/kyc" class="to-kyc">kyc认证 去认证 ></router-link>
              <span v-if="idCardStatus === '1'" class="to-kyc kyc-checked">kyc认证 审核中</span>
              <span v-if="idCardStatus === '2'" class="to-kyc kyc-checked">kyc认证 已通过</span>
              <router-link v-if="idCardStatus === '3'" to="/usercenter/kyc" class="to-kyc">kyc认证 驳回 ></router-link>
            </div>
            <div class="basic-btm">
              <span class="recent-time">最近登录时间： {{mtime ? mtime : userMtime}}</span>
              <span>IP: {{userIP}}</span>
            </div>
          </div>
        </crd>
        <crd potColor="#449aec">
          <span slot="title">安全设置</span>
          <div class="card-box safe-setting">
            <div class="card-item">
              <span class="card-item-title fl">登录密码</span>
              <span @click="handleShowChangePwdModel" class="card-item-opera fr">修改 ></span>
            </div>
            <div class="card-item car-item-unline">
              <span class="card-item-title fl">手机绑定</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <router-link v-if="bind" to="/usercenter/bind" class="card-item-opera fr">您当前绑定的手机号是<span>{{userNum}}</span> 解绑 ></router-link>
              <router-link v-else to="/usercenter/bind" class="card-item-opera fr">绑定 ></router-link>
            </div>
            <!-- <div class="card-item car-item-unline">
              <span class="card-item-title fl">谷歌验证</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <span @click="handleShowGAModel" class="card-item-opera fr">设置 ></span>
            </div> -->
          </div>

          <!-- 修改密码框 -->
          <Modal v-model="showChangePwd" class-name="change-pwd-model" :closable="false" on-cancel="handleCloseChangePwd">
            <crd potColor="#4399e9">
              <span slot="title">修改密码</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="rules" :model="changePwdModal" label-position="top">
                  <FormItem label="当前密码" prop="currentPwd">
                    <Input type="password" v-model="changePwdModal.currentPwd"></Input>
                  </FormItem>
                  <FormItem prop="password">
                    <span slot="label">新密码
                      <!-- <Tooltip content="Top Left text" placement="right"><i class="iconfont">规则</i>
                        </Tooltip> -->
                    </span>
                    <Input type="password" v-model="changePwdModal.password"></Input>
                  </FormItem>
                  <FormItem label="确认密码" prop="confirmPwd">
                    <Input type="password" v-model="changePwdModal.confirmPwd"></Input>
                    <!-- <div class="pwd-rule">
                       密码要求：8 - 32个字符，至少一个大写字母，至少一个数字，至少一个特殊字符〜！@＃$％^＆*（）_ +
                    </div> -->
                  </FormItem>
                </Form>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn model-btn-active fl" @click="handleChangePwd('formCustom')">
                  <Spin v-if="changeLoading" fix size="small"></Spin>修改</span>
                <span class="model-btn fr" @click="handleCloseChangePwd('formCustom')">取消</span>
              </div>
            </div>
          </Modal>

          <!-- 谷歌验证框 -->
          <Modal v-model="showGAModel" class-name="change-pwd-model" :closable="false">
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
                    <Form ref="formCustom" :rules="rules" :model="changePwdModal" label-position="top">
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
          </Modal>
        </crd>
        <crd potColor="#fe7263">
          <span slot="title">最近登录</span>
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
        return '***@***.***'
      }
    },
    userMtime() {
      if (this.$store.state.mtime) {
        return this.$store.state.mtime
      } else {
        return new Date().toLocaleDateString()
      }
    }
  },
  watch: {
    recentUserInfo () {
      this.mtime = this.recentUserInfo[0].time
      this.userIP = this.recentUserInfo[0].ip
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
          title: '登录',
          key: 'device'
        },
        {
          title: 'IP地址',
          key: 'ip'
        },
        {
          title: '状态',
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
                '成功'
              )
            } else {
              return h(
                'span',
                {
                  style: {
                    color: '#fc4e59'
                  }
                },
                '失败'
              )
            }
          }
        }
      ],
      recentUserInfo: [],
      changePwdModal: {},
      showChangePwd: false,
      changeLoading: false,
      userIP: '192.168.1.1',
      rules: {
        currentPwd: [
          { required: true, message: '请输入当前的密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您要修改的密码', trigger: 'blur' }
        ],
        confirmPwd: [
          {
            required: true,
            message: '请再次输入您要修改的密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (
                this.changePwdModal.password === this.changePwdModal.confirmPwd
              ) {
                callback()
              } else {
                callback(new Error('两次密码输入不一致'))
              }
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
    getUserInfo () {
      var vu = this
      ax.post('/api/user/getUserInfo')
        .then((res) => {
          if (res.status === 200 && res.data.errorCode === 0) {
            sessionStorage.setItem('idCardStatus', res.data.result.idCardStatus)
            vu.idCardStatus = res.data.result.idCardStatus
            if (res.data.result.phone) {
              vu.bind = true
              sessionStorage.setItem('bindPhone', 'bind')
              vu.userNum = '+ ' + res.data.result.phone.code + ' '  + res.data.result.phone.number
            } else {
              vu.bind = false
              console.log('unbind')
              sessionStorage.setItem('bindPhone', 'unbind')
              sessionStorage.setItem('userNum', null)
            }
            sessionStorage.setItem('email', res.data.result.email)
            sessionStorage.setItem('userNum', vu.userNum)
            console.log(res.data.result)
          } else {
            console.log('网络异常！')
          }
        })
        .catch((err) => {
          console.log('err')
          console.log(err)
          console.log('网络异常！')
        })
    },
    handleShowChangePwdModel() {
      console.log('change pwd')
      this.showChangePwd = true
    },
    handleChangePwd(form) {
      this.changeLoading = true
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          ax
            .post('/api/user/changePassword', {
              password: md5(this.changePwdModal.currentPwd),
              new_password: md5(this.changePwdModal.password)
            })
            .then(res => {
              console.log(res)
              if (res.status == '200' && res.data.errorCode == 0) {
                console.log(res.data)
                this.changeLoading = false
                vu.$Message.success(res.data.errorMsg)
                this.showChangePwd = false
              } else {
                this.changeLoading = false
                vu.$Message.error(res.data.errorMsg)
              }
            })
            .catch(err => {
              this.changeLoading = false
              vu.$Message.error('网络异常！')
            })
        } else {
          this.changeLoading = false
        }
      })
    },
    getRecentActivity() {
      ax.get('/api/user/getRecentActivity')
        .then((res) => {
          console.log(typeof res.status)
          if (res.status === 200 && res.data.errorCode === 0) {
            this.recentUserInfo = res.data.result.data
            console.log(this.recentUserInfo)
          }
        })
        .catch((err) => {
          //
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
    this.getUserInfo()
    this.getRecentActivity()
  }
}
</script>

<style lang="less">
.user-center-cont {
  width: 100%;
  padding-top: 40px;
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
    .model-btn {
      position: relative;
      // display: inline-block;
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #5999e5;
      color: #5999e5;
      background-color: #fff;
      cursor: pointer;
      // &:hover {
      //   color: #fff;
      //   background-color: #5999E5;
      // }
    }
    .model-btn-active {
      color: #fff;
      background-color: #5999e5;
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
