import axios from 'axios';

const urlBase = process.env.API;

export const GamesController = {

    register(game) {
        return axios({
            method: 'POST',
            baseURL: urlBase,
            url: `games`,
            data: game,
        })
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: urlBase,
            url: 'games'
        });
    },
    delete(name) {
        return axios({
            method: 'DELETE',
            baseURL: urlBase,
            url: `games/${name}`,
        });
    },
    getGame(name) {
        return axios({
            method: 'GET',
            baseURL: urlBase,
            url: `games/${name}`,
        });
    },
    updateGame(name) {
        return axios({
            method: 'PUT',
            baseURL: urlBase,
            url: `games/${name}`,
        });
    }
}