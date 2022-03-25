import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';


const ThirdStep = () => {
          const [countries, setCountries] = useState([]);
          const [states, setStates] = useState([]);
          const [cities, setCities] = useState([]);

          const [isLoading, setIsLoading] = useState(false);

          const [selectedCountry, setSelectedCountry] = useState('');
          const [selectedStates, setSelectedStates] = useState([]);
          const [selectedCities, setSelectedCities] = useState([]);

          useEffect(() =>{
                    const getCountries = async () => {
                              try {
                                        setIsLoading(true);
                                        
                                        const result = await csc.getAllCountries();
                                        
                                        let allCountries = [];

                                        allCountries = result?.map(({ isoCode, name }) => (
                                                  {
                                                            isoCode,
                                                            name,
                                                  }
                                        ));

                                        const [{ isoCode: firstCountry } = {}] = allCountries;

                                        setCountries(allCountries);
                                        setSelectedCountry(firstCountry);
                                        setIsLoading(false);

                              } catch (error) {
                                        setCountries([]);
                                        setIsLoading(false);
                              }
                    }

                    getCountries();
          }, []);

          const handleSubmit = async (event) => {
                    event.preventDefault();
          }


          return (
                    <Form className="input-form" onSubmit={handleSubmit}>
                              <div className="col-md-6 offset-md-3">
                                        
                              </div>
                    </Form>
          );
}


export default ThirdStep