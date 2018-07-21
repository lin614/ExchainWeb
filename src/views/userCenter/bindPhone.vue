<template>
  <page>
    <div class="bindphone-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#4399e9">
          <span slot="title">绑定手机号</span>
          <div class="bind-main">
            <div class="main-title">绑定手机号</div>
            <div class="form-box">
              <Form :model="bindForm" label-position="top">
                <FormItem label="国家">
                  <Select v-model="bindForm.country" style="width:100%;height: 50px;">
                    <Option v-for="(item, index) in countryList" :value="item.value" :key="index">{{ item.value }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="手机号">
                  <Input v-model="bindForm.phone"></Input>
                </FormItem>
                <FormItem label="短信验证码">
                  <Input style="width: 360px" v-model="bindForm.phoneCode"></Input>
                  <span class="send-code-btn">发送验证码</span>
                </FormItem>
                <FormItem label="谷歌验证码">
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
export default {
  name: 'bindphone',
  data () {
    return {
      pageHeight: 0,
      countryList: [
        {
          value: '中国 86'
        },
        {
          value: '中国 86'
        },
        {
          value: '中国 86'
        },
        {
          value: '中国 86'
        }
      ],
      bindForm: {
        country: '中国 86',
        phone: '',
        phoneCode: '',
        googleCode: ''
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
