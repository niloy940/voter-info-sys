import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AppStorage from '../models/AppStorage';
// import Questions from '../models/Questions';

Vue.use(Vuex);
axios.defaults.baseURL = 'https://still-plateau-22633.herokuapp.com/api/';

export const store = new Vuex.Store({
    state: {
        token: AppStorage.getToken() || null,
        // questions: [],
    },

    getters: {
        loggedIn(state) {
            return state.token !== null;
        },

        // getAllQuestions(state) {
        //     return state.questions;
        // }
    },

    actions:{
        register(context, form) {
            return new Promise((resolve, reject) => {
                form.post("/register")
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        retrieveToken(context, form) {
            return new Promise((resolve, reject) => {
                form.post("/login")
                    .then(response => {
                        const token = response.data.access_token;
                        AppStorage.storeToken(token);
                        context.commit('retrieveToken', token);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    let res = [];
                    axios.post('/logout')
                        .then(response => {
                            const token = response.data.access_token;
                            AppStorage.clear(token);
                            context.commit('destroyToken');
                            resolve(response);
                            response = res;
                        })
                        .catch(error => {
                            AppStorage.clear(res.data.access_token);
                            context.commit('destroyToken');
                            reject(error)
                        })
                })
            }
        },

        // allQuestions(context) {
        //     Questions.all(context, 'questions');
        // },
    },

    mutations:{
        retrieveToken(state, token) {
            state.token = token;
        },

        destroyToken(state) {
            state.token = null;
        },

        // questions(state, payload) {
        //     state.questions = payload;
        // }
    }
})
