<template>
  <div class="home-wrapper">
    <el-container>
      <el-header>
        <div class="img-box">
          <img src="../assets/a.png" alt="" />
        </div>
        <div class="content-box">
          <ul>
            <li>
              <span class="el-icon-user">用户</span>
            </li>
            <li>
              <span class="el-icon-s-custom">教学</span>
            </li>
            <li>
              <span class="el-icon-s-custom">题库</span>
            </li>
            <li>
              <span class="el-icon-s-marketing">运营</span>
            </li>
            <li>
              <span class="el-icon-menu">营销</span>
            </li>
            <li>
              <span class="el-icon-s-shop">商品</span>
            </li>
            <li>
              <span class="el-icon-set-up">财务</span>
            </li>
            <li>
              <span class="el-icon-s-help">统计</span>
            </li>
            <li>
              <span class="el-icon-setting">系统</span>
            </li>
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <el-menu :default-active="paths" class="el-menu-vertical-demo" router>
            <el-menu-item
              :index="item.path"
              v-for="(item, index) in asideList"
              :key="index"
            >
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
          <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>


<script>

export default {
  data() {
    return {
      asideList: [
        {
          id: "/study",
          name: "学员管理",
          path: "/study",
        },
        {
          id: "/teacher",
          name: "讲师管理",
          path: "/teacher",
        },
        {
          id: "/assistant",
          name: "助教管理",
          path: "/assistant",
        },
      ],
      paths: "",
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.el-header {
  width: 100%;
  height: 60px;
  // background-color: rgb(28, 28, 241);
  background: linear-gradient(to right, rgb(28, 28, 241), rgb(88, 88, 240));
  display: flex;
  img {
    margin-left: 50px;
    margin-top: 5px;
  }
  .content-box {
    height: 60px;
    line-height: 60px;
    margin-left: 50px;
    ul {
      width: 1000px;
      li {
        width: 11%;
        height: 60px;
        float: left;
        color: white;
      }
      span {
        display: inline-block;
        height: 35px;
      }
      li:hover span {
        border-bottom: 3px solid greenyellow;
      }
    }
  }
}
.el-aside {
  text-align: center;
  height: 100%;
  overflow: hidden;
}

</style>