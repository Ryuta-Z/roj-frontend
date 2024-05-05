<template>
  <Editor
    class="mdeditor"
    :value="value"
    @change="handleChange"
    :plugins="plugins"
  ></Editor>
</template>
<script setup lang="ts">
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import "highlight.js/styles/default.css";
import { defineProps, withDefaults } from "vue";
const plugins = [highlight(), gfm()];
interface Prop {
  value: string;
  handleChange: (v: string) => void;
}
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style>
.bytemd {
  height: 100vh !important;
}
</style>
