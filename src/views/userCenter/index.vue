<template>
  <page>
    <div class="user-center-cont">
      <div class="content clearfix">
        <crd potColor="#11b588">
          <span slot="title">基本信息</span>
          <div class="card-box basic-info">
            <div class="basic-top">
              <span class="email">goodlcw1@163.com</span>
              <router-link to="/usercenter/kyc" class="to-kyc">kyc认证 ></router-link>
            </div>
            <div class="basic-btm">
              <span class="recent-time">最近登录时间： 2018-07-08 16:58:22</span>
              <span>IP: 218.189.23.26</span>
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
            <div class="card-item">
              <span class="card-item-title fl">手机绑定</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <router-link to="/usercenter/bind" class="card-item-opera fr">修改 ></router-link>
            </div>
            <div class="card-item car-item-unline">
              <span class="card-item-title fl">谷歌验证</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <span class="card-item-opera fr">设置 ></span>
            </div>
          </div>
          <Modal
            v-model="showChangePwd"
            class-name="change-pwd-model"
            :closable="false">
            <crd potColor="#4399e9">
              <span slot="title">修改密码</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="rules" :model="changePwdModal" label-position="top">
                  <FormItem label="当前密码" prop="currentPwd">
                    <Input type="password" v-model="changePwdModal.currentPwd"></Input>
                  </FormItem>
                  <FormItem prop="password">
                      <span slot="label">新密码<Tooltip content="Top Left text" placement="right"><i class="iconfont">规则</i>
                    </Tooltip></span>
                    <Input type="password" v-model="changePwdModal.password"></Input>
                  </FormItem>
                  <FormItem label="确认密码" prop="confirmPwd">
                    <Input type="password" v-model="changePwdModal.confirmPwd"></Input>
                  </FormItem>
                </Form>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn model-btn-active fl" @click="handleChangePwd"><Spin v-if="changeLoading" size="small"></Spin>修改</span>
                <span class="model-btn fr" @click="handleCloseChangePwd">取消</span>
              </div>
            </div>
          </Modal>
        </crd>
        <crd potColor="#fe7263">
          <span slot="title">最近登录</span>
          <div class="card-box recent-login">
             <Table :columns="columns1" :data="data1"></Table>
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
  name: "usercenter",
  components: {
    crd,
    page
  },
  data() {
    return {
      columns1: [
        {
          title: "登录",
          key: "type"
        },
        {
          title: "IP地址",
          key: "address"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            console.log('---' + params.row.status)
            if (params.row.status === '0') {
              return h('span', {
                style: {
                  color: '#4298ec'
                }
              }, '成功')
            } else {
              return h('span', {
                style: {
                  color: '#fc4e59'
                }
              }, '失败')
            }
          }
        }
      ],
      data1: [
        {
          type: "Web",
          address: "128.0.0.1",
          status: "0"
        },
        {
          type: "PC",
          address: "128.0.0.2",
          status: "0"
        },
        {
          type: "APP",
          address: "128.0.0.3",
          status: "1"
        }
      ],
      changePwdModal: {
        currentPwd: '',
        password: '',
        confirmPwd: ''
      },
      showChangePwd: false,
      changeLoading: false,
      rules: {
        currentPwd: [
          { required: true, message: '请输入当前的密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码要求：8 - 32个字符，至少一个大写字母，至少一个数字，至少一个特殊字符〜！@＃$％^＆*（）_ +', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您要修改的密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码要求：8 - 32个字符，至少一个大写字母，至少一个数字，至少一个特殊字符〜！@＃$％^＆*（）_ +', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入您要修改的密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码要求：8 - 32个字符，至少一个大写字母，至少一个数字，至少一个特殊字符〜！@＃$％^＆*（）_ +', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (this.changePwdModal.password === this.changePwdModal.confirmPwd) {
              callback()
            } else {
              callback(new Error('两次密码输入不一致'))
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleShowChangePwdModel () {
      console.log('change pwd')
      this.showChangePwd = true
    },
    handleChangePwd () {},
    loadData () {
      ax.get(config.url.user + '/api/user/getRecentActivity').then((res) => {
        console.log('success' + JSON.stringify(res.data))
        if (res.status == 200 && res.data.errorCode == '0') {
        }
      })
    },
    handleCloseChangePwd () {
      this.showChangePwd = false
    }
  },
  created () {
    this.loadData()
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
    .ivu-table tr:last-child td{
      border-bottom: none;
    }
    .ivu-table th:last-child{
      text-align: right;
    }
    .ivu-table td:last-child{
      text-align: right;
    }
  }
}
.change-pwd-model, .login-model {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    width: 420px;
    min-height: 500px;
    top: 0;
    .ivu-modal-content {
      padding: 20px 40px 40px;
    }
    .ivu-modal-footer, .login-model-footer {
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
  }
  .model-btn {
    display: inline-block;
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    border: 1px solid #5999E5;
    color: #5999E5;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #5999E5;
    }
  }
  .model-btn-active {
    color: #fff;
    background-color: #5999E5;
  }
}
</style>
