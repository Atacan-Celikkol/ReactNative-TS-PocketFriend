import Constants from 'expo-constants';

const api_base_url = '';
const api_key = '';
const app_id = '';
const android_api_key = '';
const ios_api_key = '';

const ENV = {
    dev: {
        apiUrl: `${api_base_url}/${api_key}/${app_id}`
    },
    prod: {
        apiUrl: `${api_base_url}/${api_key}/${app_id}`
    }
};

function getEnvVars(env = "") {
    if (env === null || env === undefined || env === "") return ENV.dev;
    if (env.indexOf("dev") !== -1) return ENV.dev;
    if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
