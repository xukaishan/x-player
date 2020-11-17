<template>
  <a-layout>
    <a-layout-sider class="a-sider-layout" width="50px">
      <ul class="aside-group">
        <li
          class="aside-itm"
          v-for="(asideItm, idx) in [
            'HomeOutlined',
            'HeartOutlined',
            'SearchOutlined',
            'DownloadOutlined',
            'SettingOutlined',
          ]"
          :class="{ 'active-aside': idx === activeAside }"
          :key="asideItm + idx"
          @click="asideTabHandle(idx)"
        >
          <component :is="asideItm" />
        </li>
      </ul>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="a-header-layout">
        <div class="header-lf" style="-webkit-app-region: drag"></div>
        <ul class="header-rig">
          <li class="icon-itm" @click="handleMiniMize"><LineOutlined /></li>
          <li class="icon-itm" @click="handleFullScreen"><CopyOutlined /></li>
          <li class="icon-itm" @click="handleExit"><CloseOutlined /></li>
        </ul>
      </a-layout-header>
      <a-layout-content class="a-content-layout">
        <div class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { ipcRenderer } from 'electron';
import {
  CloseOutlined,
  LineOutlined,
  CopyOutlined,
  HomeOutlined,
  HeartOutlined,
  SearchOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
export default defineComponent({
  name: 'BaseLayout',
  components: {
    CloseOutlined,
    CopyOutlined,
    LineOutlined,
    HomeOutlined,
    HeartOutlined,
    SearchOutlined,
    DownloadOutlined,
    SettingOutlined,
  },
  setup () {
    /**aside */
    const activeAside = ref(0);
    const asideTabHandle = (idx) => {
      activeAside.value = idx
    }
    /**header-tool event */
    const handleMiniMize = () => {
      ipcRenderer.send('minimize-win')
    }
    const handleFullScreen = () => {
      ipcRenderer.send('fullScreen-win')
    }
    const handleExit = () => {
      ipcRenderer.send('close-win', true)
    }
    return {
      activeAside,
      asideTabHandle,
      handleMiniMize,
      handleFullScreen,
      handleExit,
    }
  }
});
</script>

<style scoped lang='less'>
@c333: #333;
@c4b4b: #4b4b4b;
.a-sider-layout {
  overflow: 'auto';
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: @c333;
  /deep/ .aside-group {
    padding-top: 40px;
    .aside-itm {
      width: 100%;
      height: 50px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active-aside {
        background: @c4b4b;
        svg {
          color: #fff;
        }
      }
      &:hover {
        cursor: pointer;
        background: @c4b4b;
      }
    }
  }
}
.a-header-layout {
  background-color: @c333;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  padding: 0px 10px 0px 50px;
  height: 40px;
  display: flex;
  .header-lf {
    flex: 1 1 auto;
  }
  .header-rig {
    width: 140px;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .icon-itm {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      /deep/ svg {
        cursor: pointer;
        font-size: 14px;
      }
      &:hover {
        background: @c4b4b;
      }
    }
  }
}
.ant-layout {
  .a-content-layout {
    margin-top: 40px;
    padding-left: 50px;
    min-height: calc(100vh - 50px);
    background: #1e1e1e;
    /deep/ .content {
      height: 1200px;
    }
  }
}
</style>
