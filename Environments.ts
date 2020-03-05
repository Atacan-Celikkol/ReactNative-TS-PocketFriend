import Constants from 'expo-constants';

const api_base_url = 'https://api.backendless.com';
const api_key = '1FF6847A-E791-15A3-FFEE-DDFB60C31600';
const app_id = 'F1C73522-DD64-3A93-FF4E-67CBDEDCDF00';
const android_api_key = '447D85D3-29F1-60F4-FF20-34A9EC19A000';
const ios_api_key = '867488F8-51A0-B88A-FF9B-4EDF90DD2300';

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
