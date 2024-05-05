<template>
  <Viewer class="mdviewer" :value="value" :plugins="plugins"></Viewer>
</template>
<script setup lang="ts">
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import "highlight.js/styles/default.css";
import { defineProps, withDefaults } from "vue";
const plugins = [highlight(), gfm()];
interface Prop {
  value: string;
}
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
});
</script>

<style>
.bytemd {
  height: 100vh !important;
}
</style>
