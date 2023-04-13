import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';


class ResolutionApi {
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        // console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ResolutionApi.token}` };
        const params = (method === 'get')
            ? data
            : {};
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Individual API routes */

    /**Get token for login from username, password */

    static async login(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    /** Sign up for site */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }


    /** Get the current user */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Edit user profile and save it */

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    }

    /** Get list exercises (filtered by params if given) */

    static async getExerciseData(data) {
        let res = await this.request(`exercises`, data, 'post');
        return res;
    }


    /** Get meal plan */

    static async generateMealPlan(data) {
        let res = await this.request(`meals`, data, 'post');
        return res;
    }


}

export default ResolutionApi;