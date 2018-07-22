<template>
  <page>
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <Form class="form-box" ref="bindForm" :model="bindForm" label-position="top" :rules="rules">
              <FormItem class="form-item fl" label="名" prop="phone">
                <Input v-model="bindForm.phone" @on-change="handlePhoneIpt" placeholder="名"></Input>
              </FormItem>

              <FormItem class="form-item fl family-name" label="姓" prop="phoneCode">
                <Input v-model="bindForm.phoneCode" placeholder="姓"></Input>
              </FormItem>

              <FormItem class="form-item" label="身份证号码" prop="googleCode">
                <Input v-model="bindForm.googleCode" placeholder="身份证号码"></Input>
              </FormItem>

              <FormItem class="form-item" label="身份证号码" prop="googleCode">
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>
                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="../../static/imgs/kyc-idcard1.jpg" alt="证件正面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="证件背面" prop="googleCode">
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>
                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:10px;">
                    <img src="../../static/imgs/kyc-idcard2.jpg" alt="证件正面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="身份证号码" prop="googleCode">
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>
                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:5px;">
                    <img src="../../static/imgs/kyc-idcard3.png" alt="证件正面">
                  </div>
                  <p class="sample-txt sample-txt3">
                    手持证件照通过标准：</br>
                    人物头像清晰；</br>
                    身份证件信息清晰；</br>
                    证件照旁展示一张写有：EXCHAIN+申请日期的纸张信息；</br>
                    完整的展示您的手臂持证。
                  </p>
                </div>
              </FormItem>

              <Button type="primary" @click="handleConfirmClick()" long>申请提交</Button>
            </Form>
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
  name: 'kyc',
  data () {
    return {
      pageHeight: 0,
      bindForm: {
        country: '86',
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
  .kyc-cont {
    padding-top: 40px;
    font-size: 14px;
    .kyc-main {
      padding: 60px;
      .form-box {
        .form-item {
          width: 420px;
          &.fl {
            float: left;
          }
          &.family-name {
            margin-left: 50px;
          }
          .label {
            color: #000;
          }
          .ipt-box {
            .ipt {
              width: 100%;
            }
          }
        }
      }
      .ivu-upload-select {
        width: 280px;
        height: 180px;
        padding-top: 25px;
        background: rgba(245,248,253,1);
        border-radius: 8px;
        text-align: center;
      }
      .ivu-upload .tip {
        font-size: 16px;
        color: rgba(89,153,229,1);
      }
      .sample {
        position: absolute;
        top: 0px;
        left: 320px;
        width: 750px;
        .sample-img-wrap {
          float: left;
          width: 280px;
          height: 180px;
          text-align: center;
          background: rgba(245,248,253,1);
          border-radius: 8px;
        }
        .sample-txt {
          float: left;
          margin-top: 75px;
          margin-left: 40px;
          font-size:14px;
          color:rgba(19,20,24,1);
        }
        .sample-txt3 {
          margin-top: 10px;
        }
      }
    }
  }


</style>
