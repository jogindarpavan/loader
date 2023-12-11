// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formattedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teamsData: formattedData, isLoading: false})
  }

  render() {
    const {teamsData, isLoading} = this.state
    return (
      <div className="home-route-container">
        <div className="team-list-container">
          <div className="ipl-dashboard-head-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="ipl-logo"
              alt="ipl logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div testid="loader" className="loader-container">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <ul className="teams-list">
              {teamsData.map(eachItem => (
                <TeamCard teamDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
