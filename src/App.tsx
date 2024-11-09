import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      axios.defaults.baseURL = 'https://poketcg-delta.vercel.app/';
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      const response = await axios.get("https://www.pokemon.com/us/play-pokemon/leaderboards/op/api/tcg-master/?leaderboard_type=championship&per_page=10&page=1&format=json&zone=GT")
      const records = response.data.leaderboard.records
      setData(records)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <ul className="leaderboard-summary-table with-country page-one" >
          <li className="header-row">
            <span className="header position">
              Rank
            </span>
            <span className="header player">Nombre</span>
            <span className="header score">Puntos</span>
          </li>

          {data.map((item: any, index: number) => (
            <>
            <li className={
              index === 0 ? "gold top-three" :
              index === 1 ? "silver top-three" :
              index === 2 ? "bronze top-three" :"position"
            }>
            <span className="position">{item.rank}.</span>
            <span className="player">
              <span>{item.screen_name}</span>
            </span>
            <span className="score">{item.score}</span>
          </li>
            </>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
