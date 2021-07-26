<template>
  <div class="home">
    <div class="title-container">
      <p class="title">救援地图</p>
    </div>
    <div class="button-container">
      <div class="btn-line-one">
        <el-button class="btn-style" type="primary" icon="el-icon-first-aid-kit">发起求助</el-button>
        <el-button class="btn-style" type="primary" icon="el-icon-help">发起救援</el-button>
      </div>
      <div class="btn-line-two">
        <el-button class="btn-style" type="primary" icon="el-icon-warning-outline">提供帮助</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style>
.title-container{
  width: 100vw;
  height: 4rem;
  padding: 0 1rem 0 1rem;
}
.title{
  font-size: 5em;
  line-height: 4rem;
  font-weight: bold;
}
.button-container{
  padding: 0 1rem 0 1rem;
  height: 8rem;

}
.btn-line-one{
  height: 2.5rem;
  text-align: justify;
  display: flex;
  justify-content: space-between;
}

.btn-line-two{
  text-align: center;
  margin-top: 1.5rem;
}
.button-container .btn-style{
  width: 8.5rem;
}
</style>
