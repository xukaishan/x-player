<template>
  <a-layout>
    <a-layout-sider
      class="a-sider-layout"
      width="50px"
    >
      123
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="a-header-layout"><CloseOutlined /></a-layout-header>
      <a-layout-content class="a-content-layout">
        <div
          class="content"
        >
          12312313
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>


export default {
  data () {
    return {
      selectedKeys: ['4'],
    };
  },
};
</script>

<style lang='less'>
.a-sider-layout {
  overflow: 'auto';
  height: '100vh';
  position: 'fixed';
  left: 0;
  top: 0;
  background: '#333333';
}
.a-header-layout{
  background: '#333333';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding-left: 50px;
  height: 50px;
}
.a-content-layout{
  margin-top: 50px;
  padding: 0 20px;
  min-height: calc(100vh - 50px);
  .content{
    height: 1200px;
  }
}
.div {
  height: 1200px !important;
}
</style>
