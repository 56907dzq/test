<template>
  <div class="one">
    <cardDragger
      :data="cardList"
      :colNum="3"
      :cardOutsideWidth="565"
      :cardInsideWidth="500"
      @startDrag="startDrag"
      @swicthPosition="swicthPosition"
      @finishDrag="finishDrag"
    >
      <!-- 在组件中间插入template并设置 v-slot:header="slotProps"
       header为标题栏的插槽名字，在里面的内容会渲染到你每一个卡片标题栏上
      slotProps为从子组件返回的数据，及data数组里面的每一个对象数据-->
      <!-- <template v-slot:header="slotProps">
    <div class="topMenuBox" style="border:1px solid red">
      <div class="menuTitle" v-if="slotProps.item.name">{{slotProps.item.name}}</div>
      <div class="menuTitle" v-else> 默认标题 </div>
    </div>
      </template>-->
      <!-- 与标题栏插槽一致，但需要注意v-slot:content-->
      <template v-slot:content="slotProps">
        <!-- <div class="insideData">{{slotProps.item.name}}</div> -->
        <div :id="slotProps.item.name" class="charts"></div>
      </template>
    </cardDragger>
  </div>
</template>

<script>
import { cardDragger } from "carddragger";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
  name: "One",
  data() {
    return {
      cardList: [
        {
          positionNum: 1,
          name: "chart1",
          id: "card1"
        },
        {
          positionNum: 2,
          name: "chart2",
          id: "card2"
        },
        {
          positionNum: 3,
          name: "chart3",
          id: "card3"
        }
      ]
    };
  },
  props: {
    msg: String
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
  },
  methods: {
    startDrag(event, id) {
      console.log(event);
      console.log(id);
    },
    swicthPosition(oldPositon, newPositon, originItem) {
      console.log(oldPositon); // 卡片原来的位置号码
      console.log(newPositon); // 卡片需要交换的位置号码
      console.log(originItem); // 卡片交换完成后的数据
    },
    finishDrag(oldPositon, newPositon, originItem) {
      console.log(oldPositon); // 卡片原来的位置号码
      console.log(newPositon); // 卡片需要交换的位置号码
      console.log(originItem); // 卡片交换完成后的数据
    },

    initChart1() {
      this.chart = new Highcharts.Chart(document.getElementById("chart1"), {
        title: {
          text: "2010 ~ 2016 年太阳能行业就业人员发展情况"
        },
        credits: {
          enabled: false //去掉水印
        },
        subtitle: {
          text: "数据来源：thesolarfoundation.com"
        },
        yAxis: {
          title: {
            text: "就业人数"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [
          {
            name: "安装，实施人员",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "工人",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "销售",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          },
          {
            name: "项目开发",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          },
          {
            name: "其他",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      });
    },
    initChart2() {
      this.chart = new Highcharts.Chart(document.getElementById("chart2"), {
        chart: {
          type: "column"
        },
        title: {
          text: "按性别划分的水果消费总量"
        },
        credits: {
          enabled: false //去掉水印
        },
        xAxis: {
          categories: ["苹果", "橘子", "梨", "葡萄", "香蕉"]
        },
        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: "水果数量"
          }
        },
        tooltip: {
          formatter: function() {
            return (
              "<b>" +
              this.x +
              "</b><br/>" +
              this.series.name +
              ": " +
              this.y +
              "<br/>" +
              "总量: " +
              this.point.stackTotal
            );
          }
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        },
        series: [
          {
            name: "小张",
            data: [5, 3, 4, 7, 2],
            stack: "male" // stack 值相同的为同一组
          },
          {
            name: "小潘",
            data: [3, 4, 4, 2, 5],
            stack: "male"
          },
          {
            name: "小彭",
            data: [2, 5, 6, 2, 1],
            stack: "female"
          },
          {
            name: "小王",
            data: [3, 0, 4, 4, 3],
            stack: "female"
          }
        ]
      });
    },
    initChart3() {
      this.chart = new Highcharts.Chart(document.getElementById("chart3"), {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: "简数科技每周水果消耗量"
        },
        credits: {
          enabled: false //去掉水印
        },
        subtitle: {
          text: ""
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: "货物金额",
            data: [
              ["香蕉", 8],
              ["猕猴桃", 3],
              ["桃子", 1],
              ["橘子", 6],
              ["苹果", 8],
              ["梨", 4],
              ["柑橘", 4],
              ["橙子", 1],
              ["葡萄 (串)", 1]
            ]
          }
        ]
      });
    }
  },
  components: {
    cardDragger
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.charts {
  width: 100%;
  height: 600px;
}
</style>
