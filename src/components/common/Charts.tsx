import { ScatterChart, Scatter, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface ScatterData {
  x: number;
  y: number;
  label?: string;
}

export interface BarData {
  name: string;
  value: number;
}

export interface LineData {
  name: string;
  value: number;
}

export interface BoxPlotData {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  label?: string;
}

interface ScatterChartProps {
  data: ScatterData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

export function ScatterPlot({ data, title, xLabel = 'X', yLabel = 'Y' }: ScatterChartProps) {
  return (
    <div className="w-full my-4">
      {title && <h4 className="text-center font-semibold mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name={xLabel} label={{ value: xLabel, position: 'bottom' }} />
          <YAxis type="number" dataKey="y" name={yLabel} label={{ value: yLabel, angle: -90, position: 'left' }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Data" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: BarData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
}

export function BarChartComponent({ data, title, xLabel = 'Category', yLabel = 'Value', color = '#8884d8' }: BarChartProps) {
  return (
    <div className="w-full my-4">
      {title && <h4 className="text-center font-semibold mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: xLabel, position: 'bottom' }} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'left' }} />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartProps {
  data: LineData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
}

export function LineChartComponent({ data, title, xLabel = 'X', yLabel = 'Y', color = '#8884d8' }: LineChartProps) {
  return (
    <div className="w-full my-4">
      {title && <h4 className="text-center font-semibold mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: xLabel, position: 'bottom' }} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'left' }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface HistogramProps {
  data: BarData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

export function Histogram({ data, title, xLabel = '階級', yLabel = '度数' }: HistogramProps) {
  return (
    <div className="w-full my-4">
      {title && <h4 className="text-center font-semibold mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }} barCategoryGap={0}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: xLabel, position: 'bottom' }} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'left' }} />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BoxPlotProps {
  data: BoxPlotData;
  title?: string;
}

export function BoxPlot({ data, title }: BoxPlotProps) {
  return (
    <div className="w-full my-4">
      {title && <h4 className="text-center font-semibold mb-2">{title}</h4>}
      <div className="flex justify-center">
        <svg width="200" height="300" viewBox="0 0 200 300">
          <g transform="translate(100, 20)">
            <line x1="0" y1={250 - (data.max - data.min) * 250 / (data.max - data.min + 20)} 
                  x2="0" y2={250 - (data.q3 - data.min) * 250 / (data.max - data.min + 20)} 
                  stroke="#333" strokeWidth="2" />
            
            <rect x="-30" 
                  y={250 - (data.q3 - data.min) * 250 / (data.max - data.min + 20)} 
                  width="60" 
                  height={(data.q3 - data.q1) * 250 / (data.max - data.min + 20)} 
                  fill="#8884d8" stroke="#333" strokeWidth="2" />
            
            <line x1="-30" y1={250 - (data.median - data.min) * 250 / (data.max - data.min + 20)} 
                  x2="30" y2={250 - (data.median - data.min) * 250 / (data.max - data.min + 20)} 
                  stroke="#333" strokeWidth="3" />
            
            <line x1="0" y1={250 - (data.q1 - data.min) * 250 / (data.max - data.min + 20)} 
                  x2="0" y2={250} 
                  stroke="#333" strokeWidth="2" />
            
            <line x1="-10" y1={250 - (data.max - data.min) * 250 / (data.max - data.min + 20)} 
                  x2="10" y2={250 - (data.max - data.min) * 250 / (data.max - data.min + 20)} 
                  stroke="#333" strokeWidth="2" />
            <line x1="-10" y1={250} x2="10" y2={250} stroke="#333" strokeWidth="2" />
            
            <text x="40" y={250 - (data.max - data.min) * 250 / (data.max - data.min + 20)} fontSize="12">最大値: {data.max}</text>
            <text x="40" y={250 - (data.q3 - data.min) * 250 / (data.max - data.min + 20)} fontSize="12">Q3: {data.q3}</text>
            <text x="40" y={250 - (data.median - data.min) * 250 / (data.max - data.min + 20)} fontSize="12">中央値: {data.median}</text>
            <text x="40" y={250 - (data.q1 - data.min) * 250 / (data.max - data.min + 20)} fontSize="12">Q1: {data.q1}</text>
            <text x="40" y={250} fontSize="12">最小値: {data.min}</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

