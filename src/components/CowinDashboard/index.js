// Write your code here
import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

const apiStatusDetails = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

export default class CowinDashboard extends Component {
  state = {apiStatus: apiStatusDetails.initial, vaccineData: []}

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    this.setState({
      apiStatus: apiStatusDetails.inProgress,
    })

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const fetchData = await response.json()

      const formattedData = {
        last7DaysVaccination: fetchData.last_7_days_vaccination.map(each => ({
          dose1: each.dose_1,
          dose2: each.dose_2,
          vaccineDate: each.vaccine_date,
        })),
        vaccinationByAge: fetchData.vaccination_by_age,
        vaccinationByGender: fetchData.vaccination_by_gender,
      }
      this.setState({
        apiStatus: apiStatusDetails.success,
        vaccineData: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusDetails.failed,
      })
    }
  }

  renderSuccessView = () => {
    const {vaccineData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccineData
    console.log(vaccineData)

    return (
      <div>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderFailedView = () => (
    <div className="failed-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failed-image-style"
      />
      <h1 className="failed-text-style">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader-card" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusDetails.success:
        return this.renderSuccessView()
      case apiStatusDetails.failed:
        return this.renderFailedView()
      case apiStatusDetails.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dash-board-bg-card">
        <div className="logo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo-image-style"
          />
          <h1 className="logo-text">Co-WIN</h1>
        </div>
        <h1 className="co-win-text">CoWin Vaccination in India</h1>
        {this.renderResult()}
      </div>
    )
  }
}
