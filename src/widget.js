import React, {Component} from 'react';
import axios from 'axios';
import './widget.css';

class Widget extends Component{
    constructor(props){
        super(props);
        this.state = {
            city:'',
            weatherData:null,
            status:null,
            searchButtonText: 'Search'
        }
        this.getWeatherData = this.getWeatherData.bind(this);
    }
    getWeatherData(){
        this.setState({
            searchButtonText: 'Searching...'
        });
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=b709fcac1915307bf07ae95cad0b4368`)
            .then((response)=> {
                console.log(response);
                this.setState({
                    weatherData:response.data,
                    status:response.status,
                    city: '',
                    searchButtonText: 'Search'
                });
            })
            .catch((error) => {
                this.setState({
                    status: 404,
                    weatherData: null,
                    city: '',
                    searchButtonText: 'Search'
                });
            });
    }
    handleInput(e){
        this.setState({
            city:e.target.value
        });
    }
    render(){
        var data = null;
        var dataDetails = null;
        if(this.state.status === 200 && this.state.weatherData){
            var weatherReport = this.state.weatherData;
            var minTemp = Math.ceil(weatherReport.main.temp_min-273.15);
            var maxTemp = Math.ceil(weatherReport.main.temp_max-273.15);
            var tempCel = Math.ceil(weatherReport.main.temp-273.15);
            
            var flag = `http://openweathermap.org/images/flags/${weatherReport.sys.country}.png`;
            flag = flag.toLowerCase();
            data = (
                <div className='data-section'>
                    <h1 className='city-name'>{weatherReport.name},{weatherReport.sys.country}
                        <img src={flag}/>
                    </h1><br/>
                    <span className='w-data'>{weatherReport.weather[0].description}</span>
                    <img className='w-icon' src={`http://openweathermap.org/img/w/${weatherReport.weather[0].icon}.png`}/>
                    <br/><br/>
                    <span className='coords-lbl'>LON-[{weatherReport.coord.lon}]</span>
                    <span className='coords-lbl'>LAT-[{weatherReport.coord.lat}]</span><br/><br/>
                    <div class='temp-div'>
                        <span className='temp'>{tempCel}</span>
                        <span className='degree'>O</span> 
                        <span className='celsius'>C</span>
                    </div>
                </div>
            );

            dataDetails = (
                <div className='data-dtls-section'>
                    <h4 className='dtls-head'>Details</h4>
                    <img className='w-icon icon-img' src={`http://openweathermap.org/img/w/${weatherReport.weather[0].icon}.png`}/>
                    <ul>
                        <li>
                            <span>Feels like</span>
                            <span class='flt-right'>{weatherReport.weather[0].main}</span>
                        </li>
                        <li>
                            <span>Humidity</span>
                            <span class='flt-right'>{weatherReport.main.humidity}</span>
                        </li>
                        <li>
                            <span>Pressure</span>
                            <span class='flt-right'>{weatherReport.main.pressure}</span>
                        </li>
                     </ul>
                     <span className=''>Today- {weatherReport.weather[0].description} with a temprature of {tempCel}&#8451;. Winds Variable
                     </span>
                </div>
            )
        } else if (this.state.status === 404) {
               data = (
                   <div className="error-ctn">
                       <h3>City not found. Please try another city.</h3>
                   </div>
               ); 
        }
        
        return(
            <div>
                <div className='header'>
                    <h1>Weather Forecasting</h1>
                    <input value={this.state.city} 
                            placeholder='Enter City Name'
                            type='text' 
                            onChange={(e) => this.handleInput(e)
                    }/>
                    <button className='search-btn'
                            onClick={this.getWeatherData}>{this.state.searchButtonText}
                    </button>
                </div>
                <div className='container' style={{height: `${window.innerHeight - 77}px`}}>
                    {data}  
                    {dataDetails}
                </div>

                
            </div>
            
        );
    }
}
export default Widget