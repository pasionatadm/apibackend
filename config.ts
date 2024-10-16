import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailVerification from "supertokens-node/recipe/emailverification";

export function getApiDomain() {
    const apiPort = process.env.APP_API_PORT || 3001;
    const apiUrl = process.env.APP_API_URL || `http://localhost:${apiPort}`;
    
    console.log(apiUrl);
    
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    
    console.log(websiteUrl);
    

    return websiteUrl;
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: "http://stk:3567/",
        apiKey: process.env.API_KEYS
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [
                                {
                                    clientId: process.env.GOOGLE_CLIENTID || "",
                                    clientSecret: process.env.GOOGLE_CLIENTSECRET,
                                },
                            ],
                        },
                    },
                ],
            },
        }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
        EmailVerification.init({
            mode: "REQUIRED", // or "OPTIONAL"
        }),
    ],
};
