import React, { Component } from 'react'
import QueryString from 'query-string'
import { Map, KmlLayer, DataLayer, Feature, InfoWindow, CustomOverlay, Marker, MapControl, SearchBox } from 'google-react-maps'

class GoogleMaps extends Component {

  state = {
    apiKey:'AIzaSyDxVr0Mcmk86QQ8nsq374UT7sFNmcLXmEI',
    center: {lat: 37.7749, lng: -122.4194}
  }

  componentDidMount() {
    this.getLocation()
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng
    })
  }

  getLocation() {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?${this.formatAddressQuery()}&key=${this.state.apiKey}`
    return fetch(searchUrl).then(returnedValue => {
      return returnedValue.json()
    }).then( json => {
      return json
    }).then(result => {
        return result.results[0].geometry.location
    }).then(location => {
      this.setState({
        center: location
      })
    })
  }

  formatAddressQuery() {
    const address = [this.props.address, this.props.city, this.props.state].join(" ")
    let addressString = address.split('.').join(' ');
    let query = QueryString.stringify({address:addressString})
    return query
  }

  render() {

    return (

      <Map
  
        style={{height:"100%", width:"100%"}}
        api-key={this.state.apiKey}
        center={this.state.center}
        marker={{position:this.state.center, map: this.map, title: "Hollywood!"}}
        onMount={(map, maps) => {
          this.map = map 
          this.maps = maps
        }}
        optionsConstructor={function(maps) {
          Object.assign(this, {
            scrollwheel: false,
            zoom : 15,
            mapTypeId : maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl : true,
            zoomControlOptions : {
                position: maps.ControlPosition.LEFT_CENTER
            },
            keyboardShortcuts : true,
            panControl: true,
            panControlOptions : {
                position : maps.ControlPosition.BOTTOM_RIGHT
            },
            mapTypeId : maps.MapTypeId.ROADMAP,
            mapTypeControl : true,
            mapTypeControlOptions : {
                position: maps.ControlPosition.LEFT_BOTTOM
            },
            fullscreenControlOptions : {
                position: maps.ControlPosition.RIGHT_BOTTOM
            },
            fullscreenControl: true,
            
          })
        }}>
        <Marker coords={this.state.center}>
          <InfoWindow open={true}>
              <div>{this.props.companyName}</div>
          </InfoWindow>

        </Marker>
      </Map>

    )
  }
}


export default GoogleMaps;

