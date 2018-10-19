import React, { Component } from 'react';
import axios from 'axios'
import Select from 'react-select'
import Cookies from 'js-cookie';
import moment from 'moment';

class ReturnPanel extends Component {
    state = {
        rentMovies: [],
        selectedRentMovieOption: null,
        cost: 0,
        extraCost: 0,
        returned: false,
        estimateddate: '',
        onSuccess: false,
        onError: false,
        errorMessage: '',
    }
    
    handleMovieChange = (selectedRentMovieOption) => {
        var extraCost = 0;
        var from = selectedRentMovieOption.estimated_date.split("-")
        var estidate = moment(selectedRentMovieOption.estimated_date, 'YYYY-MM-DD');
        var today = moment().toDate();
        if(estidate < today) {
            extraCost = selectedRentMovieOption.cost * 0.05;
        }
        this.setState(
            { 
                selectedRentMovieOption, 
                estimateddate: selectedRentMovieOption.estimated_date , 
                onError: false, 
                errorMessage: '',
                extraCost: extraCost,
                cost: selectedRentMovieOption.cost,
                returned: selectedRentMovieOption.returned
            });
    }

    onSubmitClicked(event){

        var rentMovieModel = {
            cost: parseFloat(this.state.cost + this.state.extraCost).toFixed(2),
            returned: true,
            client: this.state.selectedRentMovieOption.client,
            estimated_date: this.state.selectedRentMovieOption.estimated_date,
            movie: this.state.selectedRentMovieOption.movie,
            rent_date: this.state.selectedRentMovieOption.rent_date,
        };
        
        var csrftoken = Cookies.get('csrftoken')
        var headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        axios.put('http://127.0.0.1:8000/api/rentmovie/return/'+this.state.selectedRentMovieOption.value, rentMovieModel, { headers: headers })
        .then(response => {
            this.setState({ onError: false, onSuccess: true, errorMessage: '' })
        })
        .catch(error => {
            this.setState({ onError: true, errorMessage: error.response.data[0] })
        });
    }

    componentWillMount(){
        axios.get('http://127.0.0.1:8000/api/rentmovie/')
        .then(response => {
            var rentmoviesSelect = [];
            if(response.data != null){
                response.data.forEach(element => {
                    element.value = element.id
                    element.label = element.description
                    rentmoviesSelect.push(element);
                });
            }
            this.setState({ rentMovies: rentmoviesSelect});
        });
    }
  render() {
    const { selectedRentMovieOption } = this.state;

    var resultDiv = <div> </div>;
    if(this.state.onSuccess){
        resultDiv = 
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-success">
                    Movie has been returned successful!
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
                    <h4>Return a Movie</h4>
                </div>
                { resultDiv }
                <div className="row">
                    <div className="col-sm-6">
                        <label id="user">Rents</label>
                        <Select
                            value={selectedRentMovieOption}
                            onChange={this.handleMovieChange}
                            options={this.state.rentMovies}
                            name="rentMovie"
                            id="rentMovie" />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-3">
                        <label id="estimateddate">Estimated Date</label>
                        <input type="date" id="estimateddate" name="estimateddate" 
                            className="form-control" disabled="disabled"
                            value={this.state.estimateddate} />
                    </div>
                    <div className="col-sm-3">
                        <label id="cost"> Cost</label>
                        <input type="number" id="cost" name="cost" className="form-control" 
                            min="0" max="999" disabled="disabled"
                            value={this.state.cost} />
                    </div>
                    <div className="col-sm-3">
                        <label id="cost">Extra Cost</label>
                        <input type="number" id="cost" name="cost" className="form-control" 
                            min="0" max="999" disabled="disabled"
                            value={this.state.extraCost} />
                    </div>
                    <div className="col-sm-3">
                        <label id="cost">¿Retornada?</label> <br />
                        <input type="checkbox" id="returned" name="returned"
                            disabled="disabled"
                            checked={this.state.returned} />
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

export default ReturnPanel;
