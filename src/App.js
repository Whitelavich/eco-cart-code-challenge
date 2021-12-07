
import './App.css';
import axios from 'axios'
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'
import { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import error from './error.svg'


function App() {

  return (
    <div className="App">
      <Hero ></Hero>
    </div>
  );

}
class Hero extends Component{
  constructor(props){
    super(props);
    this.state = {
      img : 'https://photos.bandsintown.com/large/11529696.jpeg',
      artist : 'Halsey',
      followers : '2,097,292 followers'
    }
  }


  render(props) {

    return (
      <div>
        <div style={{ color: 'black'}}>
            <span className="p-input-icon-left">
                            <i className="pi pi-search" />
          <InputText  onChange={(e) => this.getArtist(e.target.value)} placeholder="Search" />
            </span>
        </div>
        <div className="hero-card" style={ { backgroundImage: `url(${ this.state.img }) ` } }/>
        <div className="p-flex-row  " style={ { position: `absolute`, top: `60px`, left: `10px`, backgroundColor: `rgba(0, 0, 0, .5)`, height: `200px`, width: `1000px`, paddingTop: `50px`
        } }>
          <div className="p-d-flex  p-ai-center">
            <img className="p-mr-2 p-ml-6" alt="artist" style={ { height: `150px`, width: `150px`, borderRadius: `50%` } } src={ this.state.img }/>
            <div className="p-d-flex p-flex-column   p-ai-center  ">
              <h2 className="p-mr-2" style={ { textAlign: `center` } }>
                { this.state.artist }
                <span className="pi pi-check" style={ { 'fontSize': '24px', color: `limegreen` } }/>
              </h2>
              <span>{ this.state.followers }</span>
            </div>
            <div className="p-col " >
              <Button label="Follow"/>
            </div>
          </div>
        </div>
      </div>
    )
  }

    getArtist(name){
    if(name.length > 0){
      const url = `https://rest.bandsintown.com/artists/${name}?app_id=test`
      axios.get(url).then(response => {
        console.log(response)
        if( !response.data.error && response.data !== "" ){
          this.setState(
            {
              img : response.data.image_url,
              artist : response.data.name,
              followers : response.data.tracker_count.toLocaleString() + ' followers'
            }
          )
        }else{
          this.setState({
            img: error,
            artist: 'Artist Not Found',
            followers: ''
          })
        }
        return response.data
      })
    }
  }
}


export default App;
