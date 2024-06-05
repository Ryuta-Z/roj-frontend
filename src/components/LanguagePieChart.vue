<template><div id="LangPie"></div></template>
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
  { value: 100, name: "Java" },
  {
    value: 1000,
    name: "C++",
  },
  { value: 1000, name: "C" },
]);
const initData = () => {
  var chartDom = document.getElementById("LangPie")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: "语言分布",
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
        name: "语言分布",
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
      if (item.language?.toLowerCase() == "java") {
        data[0].value++;
      } else if (item.language?.toLowerCase() == "cpp") {
        data[1].value++;
      } else {
        data[2].value++;
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
#LangPie {
  height: 250px;
  width: 600px;
  margin: auto;
}
</style>
