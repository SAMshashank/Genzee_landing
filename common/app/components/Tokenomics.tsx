'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Community Rewards', value: 30 },
  { name: 'Development', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Team', value: 15 },
  { name: 'Reserve', value: 10 },
]

const COLORS = ['#FFBB28', '#FF8042', '#00C49F', '#0088FE', '#8884D8']

export default function Tokenomics() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Tokenomics</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Token Distribution</h3>
            <p className="text-gray-300 mb-6">
              Our token distribution is designed to ensure long-term sustainability and community-driven growth.
            </p>
            <ul className="space-y-2 text-gray-300">
              {data.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{item.name}: {item.value}%</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
              View Whitepaper
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

