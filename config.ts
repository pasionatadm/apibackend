import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { SMTPService } from "supertokens-node/recipe/emailpassword/emaildelivery";
import { SMTPService as EmailVerificationSMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";

export function getApiDomain() {
    const apiPort = process.env.APP_API_PORT || 3001;
    const apiUrl = process.env.APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

let smtpSettings = {
    host: process.env.SMT_HOST || "localhost",
    from: {
        name: process.env.SMTP_FROM_NAME || "sender",
        email: process.env.SMTP_FROM_EMAIL || "info@test.com",
    },
    port: Number(process.env.SMTP_PORT) || 25,
    secure: true,
    // authUsername: "...", // this is optional. In case not given, from.email will be used
    password: "",
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: process.env.CORE_CONNURI || '',
        apiKey: process.env.API_KEYS
    },
    appInfo: {
        appName: process.env.BE_APPNAME || "Best App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailPassword.init({
            emailDelivery: {
                service: new SMTPService({smtpSettings})
            },
        }),
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
            emailDelivery: {
                service: new EmailVerificationSMTPService({smtpSettings})
            }
        }),
    ],
};
