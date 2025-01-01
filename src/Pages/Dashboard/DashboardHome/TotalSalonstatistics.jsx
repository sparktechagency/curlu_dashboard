import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TotalSalonstatistics = ({chartData}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    const data = chartData?.map((item,i)=>({
      name:months[i],
      amt:item?.user
    })) || []
    return (
        <div className='w-full h-full'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ marginTop: "10px", fontSize: "20px", fontWeight: 600, marginBottom: "10px", color: "black", }}>Total Salon statistics</p>
          {/* <Dropdown menu={{ items, onClick }} >
            <p style={{
              // width: "79px", 
              cursor: "pointer",
              color: '#717171',
              border: "1px solid #E9E9E9",
              borderRadius: "4px",
              padding: "4px 12px"
            }} onClick={(e) => e.preventDefault()}
            >
              {year}
              <DownOutlined style={{ paddingLeft: "18px" }} color='#717171' />
            </p>
          </Dropdown> */}
        </div>
        <div className='w-full h-[340px]'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#734D2C" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    )
}

export default TotalSalonstatistics
