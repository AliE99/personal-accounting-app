import * as R from "ramda";
import fse from "fs-extra";

const production = process.env.NODE_ENV === "production";

const defaultConfig = {
    server: {
        host: production ? "localhost" : undefined, // all IPs
        port: 3000,
    },
    mongo: {
        url: "mongodb://127.0.0.1:27017/personal_accounting",
        options: {
            // promiseLibrary: P,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        },
    },
};

const getLocalConfig = () => {
    try {
        const config = fse.readJsonSync(process.env.WEBLITE_CONFIG_PATH)[
            "personalAccounting"
        ];
        if (!R.is(Object, config) || R.is(Array, config)) throw new TypeError();
        return config;
    } catch (e) {
        return {};
    }
};

export default R.mergeDeepRight(defaultConfig, getLocalConfig());
