import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import AdSense from 'react-adsense';
//import { robots } from './robots'
import './Main.css'
import { setSearchField, requestRobots } from '../actions'


const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class Main extends Component {
    /*
    constructor() {
        super()
        this.state = {
            //robots: robots, 
            robots: [] 
            //searchfield: ''
        }
        console.log('constructor')
    }
    */
    componentDidMount() {
        //console.log(this.props.store.getState())

        //const url ='http://localhost:8010/teamMembers'
        //const url ='https://atsoft.com.mx:8443/demo-0.0.1-SNAPSHOT/teamMembers'
        //const url = 'https://jsonplaceholder.typicode.com/users'

        /*
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
            }).then(users => {
                
                this.setState({
                    robots: users
                })
                
                
                //this.setState({
                //    robots: []
                //})
                
            })
        */
        //console.log('componentDidMount')
        this.props.onRequestRobots()
    }

    /*
    onSearchChange = (event) => {
        this.setState({
            searchfield: event.target.value
        })
    }
    */

    render() {
        //const { robots, searchfield} = this.state
        //const { robots } = this.state
        const { searchField, onSearchChange, robots, isPending } = this.props

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        console.log('render')
        //if (!filteredRobots.length) {
        if (isPending) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <AdSense.Google
                        client='ca-pub-5397823995442688'/>
                    <h1 className='f1'>atsoft.com.mx</h1>
                    <SearchBox searchChange={onSearchChange}  />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={ filteredRobots } />
                        </ErrorBoundry>
                    </Scroll>
                </div>
                
            )
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Main)