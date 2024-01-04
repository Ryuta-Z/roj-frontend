<template>
  <div id="basl">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> <GlobalHeader /> </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Power By Ryuta</a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#basl .header {
  margin-bottom: 10px;
}
#basl .content {
  background: linear-gradient(to right, #eee, #fff);
  margin-bottom: 10px;
}
#basl .footer {
  background: #efefef;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
export default {
  components: { GlobalHeader },
};
</script>
