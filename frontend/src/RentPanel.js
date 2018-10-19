import React, { Component } from 'react';
import axios from 'axios'
import Select from 'react-select'
import Cookies from 'js-cookie';

class RentPanel extends Component {
    state = {
        movies: [],
        clients: [],
        selectedMovieOption: null,
        selectedClientOption: null,
        description: '',
        cost: 0,
        rentdate: '',
        estimateddate: '',
        onSuccess: false,
        onError: false,
        errorMessage: '',
    }
    
    handleMovieChange = (selectedMovieOption) => {
        this.setState({ selectedMovieOption, onError: false, errorMessage: '' });
    }

    handleClientChange = (selectedClientOption) => {
        this.setState({ selectedClientOption, onError: false, errorMessage: '' });
    }

    onDescriptionChange(event){
        this.setState({ description: event.target.value, onError: false, errorMessage: '' });
    }

    onCostChange(event){
        this.setState({ cost: event.target.value, onError: false, errorMessage: '' });
    }

    onRentdateChange(event){
        this.setState({ rentdate: event.target.value, onError: false, errorMessage: '' });
    }

    onEstimatedDateChange(event){
        this.setState({ estimateddate: event.target.value, onError: false, errorMessage: '' });
    }

    validateModel() {
        if(this.state.description == ''){
            this.setState({ onError: true, errorMessage: 'Should have a description.' });
            return false;
        }
        if(this.state.cost == ''){
            this.setState({ onError: true, errorMessage: 'Should have a cost.' });
            return false;
        }
        if(this.state.rentdate == ''){
            this.setState({ onError: true, errorMessage: 'Should have a rent date.' });
            return false;
        }
        if(this.state.estimateddate == ''){
            this.setState({ onError: true, errorMessage: 'Should have an return date.' });
            return false;
        }
        if(this.state.selectedMovieOption == ''){
            this.setState({ onError: true, errorMessage: 'Should have a movie.' });
            return false;
        }
        if(this.state.selectedClientOption == ''){
            this.setState({ onError: true, errorMessage: 'Should have a client.' });
            return false;
        }
        return true;
    }

    onSubmitClicked(event){
        if(!this.validateModel()){
            return;
        }

        var rentMovieModel = {
            description: this.state.description,
            cost: this.state.cost,
            rent_date: this.state.rentdate,
            estimated_date: this.state.estimateddate,
            returned: 0,
            client: this.state.selectedClientOption.value,
            movie: this.state.selectedMovieOption.value
        };
        
        var csrftoken = Cookies.get('csrftoken')
        var headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        axios.post('http://127.0.0.1:8000/api/rentmovie/create/', rentMovieModel, { headers: headers })
        .then(response => {
            this.setState({ onError: false, onSuccess: true, errorMessage: '' })
        })
        .catch(error => {
            this.setState({ onError: true, errorMessage: error.response.data[0] })
        });
    }

    componentWillMount(){
        axios.get('http://127.0.0.1:8000/api')
        .then(response => {
            var movies = [];
            if(response.data != null){
                response.data.forEach(element => {
                    movies.push({value: element.id, label: element.title });
                });
            }
            this.setState({ movies: movies });
        });

        axios.get('http://127.0.0.1:8000/api/client/')
        .then(response => {
            var clients = [];
            if(response.data != null){
                response.data.forEach(element => {
                    clients.push({value: element.id, label: element.full_name });
                });
            }
            this.setState({ clients: clients});
        });
    }
  render() {
    const { selectedMovieOption, selectedClientOption } = this.state;

    var resultDiv = <div> </div>;
    if(this.state.onSuccess){
        resultDiv = 
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-success">
                    Movie has been rented successful!
                </div>
            </div>
        </div>
    } else if(this.state.onError){
        resultDiv = 
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-danger">
                    {this.state.errorMessage}
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <div className="container">
                <div className="page-header">
                    <h4>Rent a Movie</h4>
                </div>
                { resultDiv }
                <div className="row">
                    <div className="col-sm-12">
                        <label id="description">Description</label>
                        <input type="text" id="description" name="description" 
                            value={this.state.description} onChange={this.onDescriptionChange.bind(this)}
                            placeholder="Here your description..." className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label id="user">Client</label>
                        <Select
                            value={selectedClientOption}
                            onChange={this.handleClientChange}
                            options={this.state.clients}
                            name="user"
                            id="user" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label id="movie">Movie</label>
                        <Select
                            value={selectedMovieOption}
                            onChange={this.handleMovieChange}
                            options={this.state.movies}
                            name="movie"
                            id="movie" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label id="rentdate">Rent Date</label>
                        <input type="date" id="rentdate" name="rentdate" 
                            className="form-control" 
                            value={this.state.rentdate} onChange={this.onRentdateChange.bind(this)}/>
                    </div>
                    <div className="col-sm-6">
                        <label id="estimateddate">Estimated Date</label>
                        <input type="date" id="estimateddate" name="estimateddate" 
                            className="form-control"
                            value={this.state.estimateddate} onChange={this.onEstimatedDateChange.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label id="cost">Cost</label>
                        <input type="number" id="cost" name="cost" className="form-control" 
                            min="0" max="999"
                            value={this.state.cost} onChange={this.onCostChange.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-right" style={{marginTop:'5px'}}>
                        <a href="#" className="btn btn-danger">
                            Cancel
                        </a>
                        <button type="submit" className="btn btn-success" onClick={this.onSubmitClicked.bind(this)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default RentPanel;
