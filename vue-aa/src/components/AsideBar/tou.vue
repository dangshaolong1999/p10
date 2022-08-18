<template>
  <div class="header-box">{{ this.$route.name }}</div>
</template>


<script>
export default {
  created() {
    console.log(this.$route);
  },
}
</script>

<style lang="scss" scoped>
.header-box {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
</style>