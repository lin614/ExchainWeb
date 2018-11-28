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
          <span slot="more" :class="{'more':true, 'pointer highlight': canApply === 0}" @click="applyAPI">{{ $t('userCenter.api.applyStep.apply') }}</span>
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

        <!-- 申请API与重置API -->
        <Modal v-model="applyFormShow" class-name="change-pwd-model" :closable="false" :on-visible-change="closeFormModal" :on-cancel="closeFormModal">
          <crd potColor="#4399e9">
            <span slot="title">{{ $t('userCenter.api.applyForm.title') }}</span>
            <div class="form-box">
              <Form ref="applyForm" :rules="applyForm.rules" :model="applyForm" label-position="top">
                <FormItem :label="$t('userCenter.api.applyForm.remark')" prop="remark" class="ivu-form-item-required">
                  <Input v-model="applyForm.remark"></Input>
                </FormItem>
                <FormItem v-if="modalType === 'apply'" :label="$t('userCenter.api.applyForm.passphrase')" prop="password" class="ivu-form-item-required">
                  <Input v-model="applyForm.password" type="password"></Input>
                </FormItem>
                <FormItem :label="$t('userCenter.api.applyForm.bindIp')" prop="bindIp" class="ivu-form-item-required">
                  <Input v-model="applyForm.bindIp"></Input>
                </FormItem>
                <FormItem :label="$t('userCenter.api.applyForm.access')" prop="access" class="ivu-form-item-required">
                  <CheckboxGroup v-model="applyForm.access">
                    <Checkbox label="read" :disabled="true">{{$t('userCenter.api.applyForm.read')}}</Checkbox>
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

              <span class="model-btn fr" @click="closeFormModal">{{ $t('common.cancel') }}</span>
            </div>
          </div>
        </Modal>

        <!-- 查看确认 -->
        <Modal v-model="viewFormShow" class-name="change-pwd-model" :closable="false" :on-cancel="closeFormModal">
          <crd potColor="#4399e9">
            <span slot="title">{{ $t('userCenter.api.viewForm.title') }}</span>
            <div class="form-box">
              <Form ref="viewForm" :rules="viewForm.rules" :model="viewForm" label-position="top">
                <FormItem v-if="modalType === 'view'" :label="$t('userCenter.api.applyForm.passphrase')" prop="password" class="ivu-form-item-required">
                  <Input v-model="viewForm.password" type="password"></Input>
                </FormItem>
                <FormItem :label="$t('userCenter.api.applyForm.smsCode')" prop="smsCode" class="ivu-form-item-required">
                  <Input v-model="viewForm.smsCode" style="width: 250px"></Input>
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
              <Button class="model-btn primary fl pr" @click="viewFormSubmit">
                {{ $t('common.confirm') }}
                <Spin v-show="viewFormLoading" :fix="true"></Spin>
              </Button>

              <span class="model-btn fr" @click="closeFormModal">{{ $t('common.cancel') }}</span>
            </div>
          </div>
        </Modal>

        <!-- 查看 -->
        <Modal v-model="viewForm2Show" class-name="change-pwd-model" :closable="false" :on-cancel="closeFormModal">
          <crd potColor="#4399e9">
            <span slot="title">{{ $t('userCenter.api.viewForm.title2') }}</span>
            <div class="form-box">
              <ul class="view-form-group">
                <li class="view-form-item">
                  <span class="name">apiKey</span>
                  <span class="cnt">{{viewData.access_id}}</span>
                </li>
                <li class="view-form-item">
                  <span class="name">备注名</span>
                  <span class="cnt">{{viewData.note}}</span>
                </li>
                <li class="view-form-item">
                  <span class="name">绑定IP地址</span>
                  <span class="cnt">{{viewData.ip}}</span>
                </li>
                <li class="view-form-item">
                  <span class="name">权限</span>
                  <span class="cnt">{{viewData.auth}}</span>
                </li>
                <li class="view-form-item">
                  <span class="name">secretKey</span>
                  <span class="cnt">{{viewData.secret_key}}</span>
                </li>
                <li class="view-form-item">
                  <span class="name">二维码</span>
                  <span class="cnt">{{viewData.secret_key}}</span>
                </li>
              </ul>
            </div>
          </crd>

          <div slot="footer">
            <div class="model-btn-wrap clearfix">
              <Button class="model-btn primary pr" @click="closeFormModal" style="width: 300px; margin: 0 auto; display: block;">{{ $t('common.confirm') }}</Button>
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
          key: 'remark',
          render: (h, params) => {
            return h('span', params.row.note)
          }
        },
        {
          title: this.$t('userCenter.api.myApi.apiKey'),
          key: 'apiKey',
          width: 250,
          render: (h, params) => {
            return h('span', params.row.access_id)
          }
        },
        {
          title: this.$t('userCenter.api.myApi.access'),
          key: 'access',
          render: (h, params) => {
            return h('span', params.row.auth2)
          }
        },
        {
          title: this.$t('userCenter.api.myApi.createTime'),
          key: 'createTime',
          render: (h, params) => {
            return h('span', params.row.create)
          }
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
                      this.viewMykey(params.row.access_id)
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
                      this.resetMykey(params.row)
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
                      this.deleteMykey(params.row)
                    }
                  }
                },
                this.$t('userCenter.api.myApi.delete')
              )
            ])
          }
        }
      ]
    }
  },
  data() {
    return {
      modalType: 'apply',
      codeDown: false,
      codeDownText: this.$t('register.sendCode'),
      applyFormShow: false,
      applyFormLoading: false,
      sendCodeLoading: false,
      canApply: -1,
      
      mtime: '',
      bind: false,
      userNum: '',
      idCardStatus: '',
      kycRejectedReason: '',
      levelName: '',
      myKeyData: [],
      applyForm: {
        remark: '',
        password: '',
        bindIp: '',
        access: ['read'],
        smsCode: '',
        token: ''
      },
      viewFormLoading: false,
      viewFormShow: false,
      viewForm: {
        access_id: '',
        password: '',
        token: '',
        smsCode: '',
      },
      viewForm2Show: false,
      viewData: {
        access_id: "",
        auth: "",
        ip: "",
        note: "",
        secret_key: ""
      }
    }
  },
  methods: {
    applyAPI () {
      if (this.canApply === 0) {
        this.clearCodeDown();
        this.applyFormShow = true
      }
    },
    /**
     * 获取用户等级
     */
    getApiList () {
      ax
        .post(config.url.user + '/api/userApi/getApiList')
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            let data = res.data.result.data
            for (var i = 0; i < data.length; i++) {
              data[i].auth2 = data[i].auth
              let d = data[i].auth2.split(',')
              for (var j = 0; j < d.length; j++) {
                let reg = new RegExp(d[j], "g")
                d[j] = d[j].replace(reg, this.$t('userCenter.api.applyForm.' + d[j]));
              }
              data[i].auth2 = d.join(',')
            }
            this.myKeyData = data
            this.canApply = this.myKeyData.length
          } else {
            apiError(this, res);
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },

    getSmsCode () {
      let type = '';
      if (this.modalType === 'apply') {
        type = 'apply';
      } else if (this.modalType === 'view') {
        type = 'secret';
      } else if (this.modalType === 'reset') {
        type = 'reset';
      } else if (this.modalType === 'delete') {
        type = 'delete';
      }
      ax.post(
        config.url.user + '/api/userApi/getCode',
        {
          type: type
        },
        getHeader
      )
      .then(res => {
        if (res.status === 200 && res.data.errorCode === 0) {
          if (this.modalType === 'apply' || this.modalType === 'reset') {
            this.applyForm.token = res.data.result.token
          } else if (this.modalType === 'view' || this.modalType === 'delete') {
            this.viewForm.token = res.data.result.token
          }
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
      this.applyFormLoading = true;
      if (this.modalType === 'apply') {
        ax.post(
          config.url.user + '/api/userApi/generateApi',
          {
            password: md5(this.applyForm.password),
            auth: this.applyForm.access.join(','),
            ip: this.applyForm.bindIp,
            note: this.applyForm.remark,
            token: this.applyForm.token,
            code: this.applyForm.smsCode
          },
          getHeader
        )
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.$refs.applyForm.resetFields()
            this.applyFormShow = false
            this.getApiList();
            this.$Message.success(this.$t('errorMsg.SUCCESS'))
          } else {
            apiError(this, res)
          }
          this.applyFormLoading = false;
        })
        .catch((err) => {
          this.applyFormLoading = false;
          apiReqError(this, err);
        })
      } else {
        ax.post(
          config.url.user + '/api/userApi/resetApi',
          {
            access_id: this.applyForm.access_id,
            auth: this.applyForm.access.join(','),
            ip: this.applyForm.bindIp,
            note: this.applyForm.remark,
            token: this.applyForm.token,
            code: this.applyForm.smsCode
          },
          getHeader
        )
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.$refs.applyForm.resetFields()
            this.applyFormShow = false
            this.getApiList();
            this.$Message.success(this.$t('errorMsg.SUCCESS'))
          } else {
            apiError(this, res)
          }
          this.applyFormLoading = false;
        })
        .catch((err) => {
          this.applyFormLoading = false;
          apiReqError(this, err);
        })
      }
    },
    closeFormModal () {
      debugger
      if (this.modalType === 'apply' || this.modalType === 'reset') {
        debugger
        this.$refs.applyForm.resetFields()
        // this.applyFormShow = false
      } else if (this.modalType === 'view' || this.modalType === 'delete') {
        debugger
        this.$refs.viewForm.resetFields()
        // this.viewFormShow = false;
      }
    },
    viewMykey (access_id) {
      this.modalType = 'view';
      this.viewFormShow = true;
      this.viewForm.accessId = access_id;
      this.clearCodeDown();
    },
    resetMykey (obj) {
      this.modalType = 'reset';
      this.applyForm.access_id = obj.access_id
      this.applyForm.access = obj.auth.split(',')
      this.applyForm.bindIp = obj.ip
      this.applyForm.remark = obj.note
      this.applyForm.token = obj.token
      this.applyFormShow = true;
      this.clearCodeDown();
    },
    deleteMykey (obj) {
      this.modalType = 'delete';
      this.viewFormShow = true;
      this.viewForm.accessId = obj.access_id;
      this.clearCodeDown();
    },
    viewFormSubmit () {
      this.viewFormLoading = true;
      if (this.modalType === 'apply') {
        ax.post(
          config.url.user + '/api/userApi/getApiInfo',
          {
            access_id: this.viewForm.accessId,
            password: md5(this.viewForm.password),
            token: this.viewForm.token,
            code: this.viewForm.smsCode
          },
          getHeader
        )
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.$refs.viewForm.resetFields()
            this.viewFormShow = false
            this.viewForm2Show = true
            this.viewData.access_id = res.data.result.access_id
            this.viewData.auth = res.data.result.auth
            this.viewData.ip = res.data.result.ip
            this.viewData.note = res.data.result.note
            this.viewData.secret_key = res.data.result.secret_key
          } else {
            apiError(this, res)
          }
          this.viewFormLoading = false;
        })
        .catch((err) => {
          this.viewFormLoading = false;
          apiReqError(this, err);
        })
      } else {
        ax.post(
          config.url.user + '/api/userApi/delApi ',
          {
            access_id: this.viewForm.accessId,
            token: this.viewForm.token,
            code: this.viewForm.smsCode
          },
          getHeader
        )
        .then(res => {
          if (res.status === 200 && res.data.errorCode === 0) {
            this.$refs.viewForm.resetFields()
            this.viewFormShow = false
            this.getApiList();
            this.$Message.success(this.$t('errorMsg.SUCCESS'))
          } else {
            apiError(this, res)
          }
          this.viewFormLoading = false;
        })
        .catch((err) => {
          this.viewFormLoading = false;
          apiReqError(this, err);
        })
      }
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
        } else {
          this.codeDown = true
          this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
        }
      }, 1000)
    },
    clearCodeDown () {
      this.codeDown = false
      this.codeDownText = this.$t('register.sendCode')
      clearInterval(this.timer)
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
    this.getApiList()
    bus.$on('langChange', () => {
      let data = this.myKeyData
      for (var i = 0; i < data.length; i++) {
        data[i].auth2 = data[i].auth
        let d = data[i].auth2.split(',')
        for (var j = 0; j < d.length; j++) {
          let reg = new RegExp(d[j], "g")
          d[j] = d[j].replace(reg, this.$t('userCenter.api.applyForm.' + d[j]));
        }
        data[i].auth2 = d.join(',')
      }
    })
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
        height: 70px;
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
.view-form-group {
    .view-form-item {
      .name {
        display: inline-block;
        width: 100px;
        line-height: 30px;
      }
      .cnt {
        display: inline-block;
      }
    }
  }
</style>
