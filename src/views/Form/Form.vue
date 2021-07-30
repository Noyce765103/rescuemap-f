<template>
  <div class="page--form">
    <template v-if="isSOSForm">
      <h2 class="title">填写求助信息</h2>
      <el-form class="form" ref="sosForm" :model="sosForm">
        <el-form-item label="求助者姓名" prop="name">
          <el-input v-model="sosForm.name"></el-input
        ></el-form-item>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="位置" prop="location">
              <el-input v-model="sosForm.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="location-button">
              <i class="el-icon-position"></i>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="sosForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div class="phone-code-button">
              <el-button type="primary" size="medium">发送验证码</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="unable-receive-code">
          <el-link>无法接收验证码？</el-link>
        </div>
        <el-form-item label="验证码" prop="phoneCode">
          <el-input v-model="sosForm.code"></el-input
        ></el-form-item>
        <el-form-item label="被困人数" prop="trappedNumber">
          <el-input v-model="sosForm.trappedNumber"></el-input
        ></el-form-item>
        <el-form-item label="详细描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            v-model="sosForm.description"
          ></el-input
        ></el-form-item>
        <el-form-item label="图片上传"> <el-input></el-input></el-form-item>
        <el-form-item> <el-button type="primary">提交</el-button></el-form-item>
      </el-form>
    </template>

    <template v-if="isRescueForm">
      <h2 class="title">填写救援信息</h2>
      <el-form class="form" ref="rescueForm" :model="rescueForm">
        <el-form-item label="救援联系人" prop="name">
          <el-input v-model="sosForm.name"></el-input
        ></el-form-item>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="位置" prop="location">
              <el-input v-model="sosForm.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="location-button">
              <i class="el-icon-position"></i>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="sosForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div class="phone-code-button">
              <el-button type="primary" size="medium">发送验证码</el-button>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="验证码" prop="phoneCode">
          <el-input v-model="sosForm.code"></el-input
        ></el-form-item>
        <el-form-item label="装备情况" prop="trappedNumber">
          <el-input v-model="sosForm.trappedNumber"></el-input
        ></el-form-item>
        <el-form-item label="详细描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            v-model="sosForm.description"
          ></el-input
        ></el-form-item>
        <el-form-item> <el-button type="primary">提交</el-button></el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      formType: '',
      sosForm: {
        name: '',
        location: '',
        phone: '',
        description: '',
        trappedNumber: '',
      },
      rescueForm: {
        name: '',
        location: '',
        phone: '',
        rescueTools: '',
        description: '',
      },
    };
  },
  watch: {
    $route() {
      this.formType = this.$route.query.type;
    },
  },
  computed: {
    isSOSForm() {
      return this.formType === 'sos';
    },
    isRescueForm() {
      return this.formType === 'rescue';
    },
  },
  mounted() {
    this.formType = this.$route.query.type;
  },
};
</script>

<style scoped>
.page--form {
  padding-left: 10%;
  padding-right: 10%;
}
.title {
  font-weight: 600;
  font-size: 1.2em;
  margin-bottom: 20px;
}
.location-button {
  font-size: 1.4em;
  margin-top: 52px;
  margin-left: 10px;
  color: #409eff;
}
.phone-code-button {
  margin-top: 42px;
}
.unable-receive-code {
  text-align: right;
  font-size: 0.8em;
  margin-top: 10px;
}
.form {
  max-width: 400px;
}
</style>
