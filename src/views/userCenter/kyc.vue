<template>
  <page>
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <Form class="form-box" ref="formField" :model="formField" :rules="rules" label-position="top">
              <FormItem class="form-item fl" label="名" prop="firstName">
                <Input v-model="formField.firstName" placeholder="名"></Input>
              </FormItem>

              <FormItem class="form-item fl family-name" label="姓" prop="familyName">
                <Input v-model="formField.familyName" placeholder="姓"></Input>
              </FormItem>

              <FormItem class="form-item" label="身份证号码" prop="idcardNo">
                <Input v-model="formField.idcardNo" placeholder="身份证号码"></Input>
              </FormItem>

              <FormItem class="form-item" label="证件正面" prop="fontImg">
                <Upload
                  multiple
                  :on-success="handleFontSuccess"
                  action="/api/user/userUploadIdentity"
                  :data="{type: 'pid', idCardSide: 'font'}"
                  :with-credentials="true">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>
                
                <img class="uploaded-img" v-if="formField.fontImg" :src="formField.fontImg" alt="证件正面">

                <div class="sample">
                  <div class="sample-img-wrap">
                    <img src="../../static/imgs/kyc-idcard1.png" alt="证件正面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="证件背面" prop="backImg">
                <Upload
                  multiple
                  :on-success="handleBackSuccess"
                  action="/api/user/userUploadIdentity">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>

                <img class="uploaded-img" v-if="formField.backImg" :src="formField.backImg" alt="证件正面">

                <div class="sample">
                  <div class="sample-img-wrap" style="padding-top:10px;">
                    <img src="../../static/imgs/kyc-idcard2.png" alt="证件背面">
                  </div>
                  <p class="sample-txt">为方便审核，请上传清晰的照片</p>
                </div>
              </FormItem>

              <FormItem class="form-item" label="手持证件照片" prop="holdImg">
                <Upload
                  multiple
                  :on-success="handleHoldSuccess"
                  action="/api/user/userUploadIdentity">
                  <div style="padding: 20px 0">
                      <img src="../../static/imgs/kyc-idcard-upload.png" alt="上传">
                      <p class="tip">上传身份证件信息</p>
                  </div>
                </Upload>

                <img class="uploaded-img" v-if="formField.holdImg" :src="formField.holdImg" alt="证件正面">

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

              <Button class="submit" type="primary" @click="handleSubmit()">申请提交</Button>
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
      formField: {
        firstName: '',
        familyName: '',
        idcardNo: '',
        fontImg: '',
        backImg: '',
        holdImg: ''
      },
      files: {
        font: '',
        back: '',
        hold: ''
      },
      rules: {
        firstName: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        familyName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        idcardNo: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        fontImg: [
          { required: true, message: '请上传证件正面', trigger: 'change' }
        ],
        backImg: [
          { required: true, message: '请上传证件反面', trigger: 'change' }
        ],
        holdImg: [
          { required: true, message: '请上传手持证件照片', trigger: 'change' }
        ]
      },
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
    handleSubmit () {
      this.$refs.formField.validate(valid => {
      });
    },
    /**
     * 证件正面上传成功处理
     */
    handleFontSuccess (res, file) {
      // this.formField.Font = res.data;
      console.log(res)
      console.log(file)
    },
    /**
     * 证件反面上传成功处理
     */
    handleBackSuccess () {
      // this.formField.backImg = res.data;
    },
    /**
     * 手持证件照片上传成功处理
     */
    handleHoldSuccess () {
      // this.formField.holdImg = res.data;
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
        position: relative;
        width: 280px;
        height: 180px;
        padding-top: 25px;
        background: rgba(245,248,253,1);
        border-radius: 8px;
        text-align: center;
        img {
          display: inline-block;
        }
      }
      .uploaded-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 280px;
        height: 180px;
        border-radius: 8px;
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
      .submit {
        width: 280px;
      }
    }
  }


</style>
