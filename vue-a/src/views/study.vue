<template>
  <div class="study-wrapper">
    <header>
      <h6>学员管理</h6>
    </header>
    <content>
      <div class="input-box">
        <span class="a">学员状态</span>
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
        <span class="a">学生名称</span>
        <el-input v-model="name" placeholder="请输入学生关键字"></el-input>
        <span class="a">手机号</span>
        <el-input v-model="tel" placeholder="请输入手机号"></el-input>
        <el-button icon="el-icon-search" @click="search">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
      <div class="button-box">
        <el-button type="primary">新增学员</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">查看报表</el-button>
      </div>
      <div class="table-box">
        <el-table :data="list" border tooltip-effect="dark" stripe>
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="nickname" label="学员名称">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" />
              &emsp;
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status === 0 ? "禁用" : "启用" }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间">
            <template slot-scope="{ row: { created_at } }">
              {{ new Date(Number(created_at)).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <a href="javascript:;">详情-</a>
            <a href="javascript:;">编辑-</a>
            <a href="javascript:;">禁用-</a>
            <a href="javascript:;">删除-</a>
            <a href="javascript:;">重置密码</a>
          </el-table-column>
        </el-table>
      </div>
    </content>
    <div class="footer-box">
      <div class="left-box">
        <el-button type="text">导出所选</el-button>
      </div>
      <div class="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagesize"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      listCopy: [],
      name: "",
      tel: "",
      select: "",
      pagesize: 1,
      pagenum: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios.get("list.json").then((res) => {
        console.log(res);
        this.list = res.data;
        this.listCopy = res.data;
        this.total = this.list.length;
        var startIndex = (this.pagesize - 1) * this.pagenum;
        var endIndex = this.pagesize * this.pagenum;
        this.list = this.listCopy.slice(startIndex, endIndex);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      if (this.select) {
        const a = this.listCopy.filter((item) => {
          if (item.status == this.select) {
            return item;
          }
        });
        this.list = a;
      }
      if (this.name) {
        const a = this.listCopy.filter((item) => {
          if (item.nickname.includes(this.name)) {
            return item;
          }
        });
        this.list = a;
      }
      if (this.tel) {
        const a = this.listCopy.filter((item) => {
          if (item.mobile.includes(this.tel)) {
            return item;
          }
        });
        this.list = a;
      }
      if (this.select && this.name && this.tel) {
        const a = this.listCopy.filter((item) => {
          if (item.status == this.select) {
            return item;
          }
        });
        const b = a.filter((item) => {
          if (item.nickname.includes(this.name)) {
            return item;
          }
        });
        const c = b.filter((item) => {
          if (item.tel.includes(this.tel)) {
            return item;
          }
        });
        this.list = c;
      }
    },
    reset() {
      (this.name = ""), (this.tel = ""), (this.select = "");
      this.getList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagesize = val;
      this.getList();
    },
  },
};
</script>

<style lang="scss">
// ::v-deep tr {
//     vertical-align: middle !important;
//   }
.study-wrapper {
  width: 100%;
  header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #000;
    h6 {
      margin-left: 15px;
    }
  }
  content {
    .input-box {
      margin-top: 20px;
    }
    .el-input {
      width: 180px;
    }
    .a {
      margin-right: 15px;
      margin-left: 30px;
    }
    .el-button {
      margin-left: 15px;
    }
    .el-select {
      width: 180px;
    }
    .button-box {
      margin-top: 15px;
      .el-button {
        border-radius: 5px;
        text-align: center;
      }
    }
    .table-box {
      padding: 10px;
      box-sizing: border-box;
      .cell {
        //  margin: 0px !important;
        //  padding: 0px !important;
        display: flex;

        align-items: center;
        //  width: 9px !important;
        //  height: 9px !important;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .footer-box {
    display: flex;
    justify-content: space-between;
    .right {
      width: 50%;
      display: flex;
    }
  }
}
</style>