// Write your code here

import {PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="VaccinationByGender-card">
      <h1 className="VaccinationByGender-heading">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            cx={650}
            cy={280}
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="35%"
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              padding: 30,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
