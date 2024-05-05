<template>
  <div id="basl">
    <a-layout style="height: 100vh">
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
  background: rgb(212, 210, 210);
  margin-bottom: 10px;
}
#basl .footer {
  background: #efefef;
  text-align: center;
}
</style>
<script lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";

export default {
  components: { GlobalHeader },
};
</script>
