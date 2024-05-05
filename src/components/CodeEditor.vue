<template>
  <div id="codeEditor" ref="codeEditorRef"></div>
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
import { defineProps, withDefaults } from "vue";
const monacoEditor = ref();
const codeEditorRef = ref();
interface Prop {
  code: string;
  lang: string;
  handleChange: (v: string) => void;
}
const props = withDefaults(defineProps<Prop>(), {
  code: () => "",
  lang: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});
watch(
  () => props.lang,
  () => {
    if (monacoEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(monacoEditor.value).getModel(),
        props.lang
      );
    }
  }
);
onMounted(() => {
  if (codeEditorRef.value == null) return;
  monacoEditor.value = monaco.editor.create(codeEditorRef.value, {
    theme: "vs-dark", // 主题
    value: props.code, // 默认显示的值
    language: props.lang, // todo
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    readOnly: false, //是否只读  取值 true | false
    wordWrap: "on", //启用自动换行
  });
  monacoEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(monacoEditor.value).getValue());
  });
});
</script>
<style>
#codeEditor {
  height: 100vh;
}
</style>
