<template><div id="timeBarChart"></div></template>
<script lang="ts" setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { defineProps, withDefaults } from "vue";
import { onMounted } from "vue";
import { reactive } from "vue";
import {
  JudgeControllerService,
  QuestionSubmitVO,
} from "@/api/roj-apis/judgeApi";
echarts.use([GridComponent, BarChart, CanvasRenderer]);

interface Prop {
  value: string;
}
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
});
var data = reactive({ 50: 1, 70: 3, 60: 3 });
const initData = () => {
  var chartDom = document.getElementById("timeBarChart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "运行时间分布",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: Object.keys(data),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: Object.values(data),
        type: "bar",
      },
    ],
  };

  option && myChart.setOption(option);
};
const getData = async () => {
  const resp = await JudgeControllerService.listQuestionSubmitByPageUsingPost({
    questionId: props.value,
  });
  console.log("time", resp);
  if (resp.code == 0) {
    data = Object.create(null);
    const times = resp.data.records.map(
      (obj: QuestionSubmitVO) => obj.judgeInfo?.time
    );
    times.forEach((time: number) => {
      if (time) {
        if (data[time]) data[time]++;
        else data[time] = 1;
      }
    });
  }
};
setTimeout(() => {
  initData();
}, 1000);
onMounted(() => {
  getData();
});
</script>
<style scoped>
#timeBarChart {
  height: 250px;
  width: 600px;
  margin: auto;
}
</style>
