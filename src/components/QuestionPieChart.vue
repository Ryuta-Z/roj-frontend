<template><div id="PieSheet"></div></template>
<script lang="ts" setup>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { reactive } from "vue";
import {
  JudgeControllerService,
  QuestionSubmitVO,
} from "@/api/roj-apis/judgeApi";
import { defineProps, withDefaults } from "vue";
import { onMounted } from "vue";
interface Prop {
  value: string;
}
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
});

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;
const data = reactive([
  { value: 100, name: "AC" },
  { value: 100, name: "WA" },
  { value: 100, name: "CE" },
  { value: 1000, name: "MLE" },
  { value: 300, name: "TLE" },
  { value: 400, name: "RE" },
]);
const initData = () => {
  var chartDom = document.getElementById("PieSheet")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: "提交分布",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "提交分布",
        type: "pie",
        radius: "50%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
};
const getData = async () => {
  const resp = await JudgeControllerService.listQuestionSubmitByPageUsingPost({
    questionId: props.value,
  });
  if (resp.code == 0) {
    for (let i = 0; i < data.length; i++) {
      data[i].value = 0;
    }
    resp.data.records.forEach((item: QuestionSubmitVO) => {
      console.log("status", item.status);
      if (item.status == 1) {
        data[0].value++;
      } else if (item.status == 2) {
        data[1].value++;
      } else if (item.status == 3) {
        data[2].value++;
      } else if (item.status == 4) {
        data[3].value++;
      } else if (item.status == 5) {
        data[4].value++;
      } else if (item.status == 6) {
        data[5].value++;
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
#PieSheet {
  height: 250px;
  width: 600px;
  margin: auto;
}
</style>
