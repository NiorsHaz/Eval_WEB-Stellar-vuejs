<script>
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default {
  props: {
    type: {
      type: String,
      default: 'line',
      validator: value => ['line', 'bar'].includes(value)
    },
    data: {
      type: Array,
      required: true
    },
    xKey: {
      type: String,
      required: true
    },
    yKey: {
      type: String,
      required: true
    }
  },
  components: {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  }
};
</script>

<template>
  <div class="chart-container">
    <ResponsiveContainer width="100%" height="300">
      <component
        :is="type === 'line' ? 'LineChart' : 'BarChart'"
        :data="data"
        margin="{ top: 10, right: 30, left: 0, bottom: 0 }"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis :dataKey="xKey" />
        <YAxis />
        <Tooltip />
        <Line
          v-if="type === 'line'"
          :type="'monotone'"
          :dataKey="yKey"
          stroke="#8884d8"
          stroke-width="3"
          dot
        />
        <Bar
          v-else
          :dataKey="yKey"
          fill="#82ca9d"
          bar-size="30"
        />
      </component>
    </ResponsiveContainer>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
}
</style>
