import echarts from 'echarts'
import { COLORS } from '@/assets/js/constant';

const { color, color0, borderColor, borderColor0 } = COLORS;
const barMaxWidth = 50;

echarts.registerTheme("customTheme",{
    // 默认色板
    color: [
        '#ff874f','#b16cff', color, color0, borderColor, borderColor0 
    ],

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {          // 直线指示器样式设置
                color: '#ff9f00',
                type: 'dashed'
            },
            crossStyle: {
                color: '#ff9f00'
            },
            shadowStyle: {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },

    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#bfbfbf'
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#bfbfbf '
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    candlestick:{
        barMaxWidth,
        itemStyle:{
            color,
            color0,
            borderColor,
            borderColor0,
        },
        markLine:{
            lineStyle:{
                width:1,
                type:"dashed",
                color:borderColor0,
                borderWidth:0,
            },
            label:{
                color:borderColor0,
            },
            emphasis:{
                lineStyle:{
                    width:1,
                    borderWidth:0
                }
            }
        }
    },

    line:{
        lineStyle:{
            width:1
        }
    },

    bar:{
        itemStyle:{
            color:color0,
            borderWidth:0,
        },
        barMaxWidth
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
});